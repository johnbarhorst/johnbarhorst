const router = require('express').Router();
const fetch = require('node-fetch');
const db = require('better-sqlite3')('./database.sqlite3', { readonly: true });
require('dotenv').config();
const APIKEY = process.env.APIKEY;

const headers = {
  "X-API-KEY": APIKEY,
}


// HELPER FUNCTIONS:

// Hash converter for sqlite look ups
const convertHash = hash => {
  let x = parseInt(hash);
  if (x > 0xFFFFFFFF) {
    console.error('Too big, must have a wrong number');
  }
  if (x > 0x7FFFFFFF) {
    x = 0x100000000 - x;
    if (x < 2147483648) {
      return -x
    }
    else {
      return -2147483648
    }
  }
  return x;
}

// sqlite db query function
const getFromDB = async (hash, table) => {
  return await new Promise(resolve => {
    const stmt = db.prepare(`SELECT json FROM ${table} WHERE id = ?`);
    const result = stmt.get(convertHash(hash));
    if (result) {
      resolve(JSON.parse(result.json));
    } else {
      resolve({ error: `${hash} not found in ${table}` });
    }
  })
}

// Bungie has a ton of ErrorCode possibilities, 1 = success!
function checkStatus(res) {
  if (res.ErrorCode === 1) {
    return true
  } else {
    return false;
  }
}

// Get all details from an API object, when the object's keys are the hashes.
// Without a callback, this will return an array of objects, containing the original data,
// along with the database entries for the object passed in as details.
// Provieded with a callback, this will return only what is specified in the callback function,
// with item being the original item, and details being the result of the database query.
// Ex: (item, details) => {
//    return {
//       ...details.displayProperties,
//       value: item.value,
//       displayMaximum: item.displayMaximum,
//     };
const getDetailsAll = async (object, table, callback) => {
  const hashArray = Array.from(Object.keys(object));
  const objectWithDetails = await Promise.all(hashArray.map(async hash => {
    const details = await getFromDB(hash, table);
    if (callback) {
      return callback(object[hash], details);
    } else {
      return {
        ...object[hash],
        details
      };
    }
  }));
  return objectWithDetails;
}
// A giant mess of a function that returns a whole bunch of character data, processed with live data
// from the API, as well as static data from the sqlite database.
const processCharacters = async (data) => {
  // References as listed on in the API docs. All sources say this info is highly unlikely to change, however if
  // you start getting the wrong info, you can double check at https://bungie-net.github.io/multi/
  const classTypeRef = ["Titan", "Hunter", "Warlock"];
  const genderTypeRef = ["Male", "Female"];
  const raceTypeRef = ["Human", "Awoken", "Exo"];
  const damageTypeEnum = [null, 'kinetic', 'arc', 'solar', 'void', 'raid'];
  const energyTypeEnum = [null, 'arc', 'solar', 'void']; // So far looks like armor has this info in the energy db entry.

  // shorthand for parts of the data object from bungie
  const instances = data.itemComponents.instances.data;
  const sockets = data.itemComponents.sockets.data;
  const stats = data.itemComponents.stats.data;

  // Character title details
  // TODO: Test against a character with no title, then format this properly with only the info we need.
  const getTitleDetails = async character => {
    return character.titleRecordHash ? await getFromDB(character.titleRecordHash, 'DestinyRecordDefinition') : null
  }

  // Armor Energy definitions from DB along with the instanced data from API
  const getEnergyDetails = async item => {
    const details = await getFromDB(item.energyTypeHash, 'DestinyEnergyTypeDefinition');
    return {
      ...details.displayProperties,
      transparentIconPath: details.transparentIconPath,
      capacity: item.energyCapacity,
      used: item.energyUsed,
      unused: item.energyUnused
    }
  }

  // Socket definitions from the DB for instanced items from the API
  const getSocketDetails = async sockets => {
    const values = Array.from(Object.values(sockets));
    const details = await Promise.all(values.map(async socket => {
      const data = await getFromDB(socket.plugHash, 'DestinyInventoryItemDefinition');
      const displayProperties = data.displayProperties ? data.displayProperties : {};
      return {
        ...socket,
        ...displayProperties
      }
    }))
    return details;
  }

  // The big congregation of data for an individual character.
  const getGuardianEquipmentDetails = async equipment => {
    const itemsWithDetails = await Promise.all(equipment.map(async item => {

      // Take each item and get static details from the database
      const details = await getFromDB(item.itemHash, 'DestinyInventoryItemDefinition');

      // Match up the item with its instanced data
      const instanceDetails = instances[item.itemInstanceId];

      // Match up item stats with its instanced data, if no instanced data, return an empty object
      // so that later on there aren't errors. Allows for easier processing of all the data.
      const instancedStats = item.itemInstanceId ? (stats[item.itemInstanceId] || { stats: {} }).stats : {};

      // Match up item sockets with its instanced data, if no instanced data, return an empty array,
      // so that later on a .map() will return nothing instead of throwing an error.
      const instancedSockets = item.itemInstanceId ? (sockets[item.itemInstanceId] || { sockets: [] }).sockets : [];
      // Take all the processed data to return only what we want to display.
      return {
        itemHash: item.itemHash,
        ...details.displayProperties,
        screenshot: details.screenshot,
        itemTypeDisplayName: details.itemTypeDisplayName,
        displaySource: details.displaySource,
        // TODO This got borked. Don't even think I need it, yet I want to fix it.
        // staticStats: await getDetailsAll(details.stats.stats, 'DestinyStatDefinition', (item, details) => {
        //   return {
        //     ...details.displayProperties,
        //     value: item.value,
        //     displayMaximum: item.displayMaximum,
        //   };
        // }),
        instanceStats: await getDetailsAll(instancedStats, 'DestinyStatDefinition', (item, details) => {
          return {
            ...details.displayProperties,
            value: item.value,
            displayMaximum: item.displayMaximum,
          };
        }),
        damageType: damageTypeEnum[instanceDetails.damageType],
        energy: instanceDetails.energy ? await getEnergyDetails(instanceDetails.energy) : {},
        sockets: instancedSockets ? await getSocketDetails(instancedSockets) : {},

        // Uncomment these to see all the original data, in case you want to dig and find other things to display
        // originalData: { ...item },
        // originalInstance: { ...instanceDetails },
        // originalInstanceStats: { ...instancedStats },
        // originalSockets: { ...instancedSockets },
      };
    }))
    return itemsWithDetails;
  }

  const characterArray = Array.from(Object.values(data.characters.data));
  const charactersWithDetails = await Promise.all(characterArray.map(async character => {

    // Uncomment these AND the pvp/pve stats down at the bottom of this function to send
    // weapon kill stats along with the character data call.
    // Making 3 more API calls in with the character data does make the whole call take considerably longer,
    // so I'm leaning towards making this a separate route to be hit when loading an individual character page.

    // const historicalStats = await fetch(
    //   `https://www.bungie.net/Platform/Destiny2/${character.membershipType}/Account/${character.membershipId}/Character/${character.characterId}/Stats/?groups=Weapons`,
    //   { headers }).then(res => res.json());
    // const historyStatus = checkStatus(historicalStats);
    // const pvpStats = historyStatus ? historicalStats.Response.allPvP.allTime : {};
    // const pveStats = historyStatus ? historicalStats.Response.allPvE.allTime : {};

    return {
      membershipId: character.membershipId,
      membershipType: character.membershipType,
      characterId: character.characterId,
      dateLastPlayed: character.dateLastPlayed,
      minutesPlayedThisSession: character.minutesPlayedThisSession,
      minutesPlayedTotal: character.minutesPlayedTotal,
      light: character.light,
      race: raceTypeRef[character.raceType],
      gender: genderTypeRef[character.genderType],
      classType: classTypeRef[character.classType],
      emblemBackgroundPath: character.emblemBackgroundPath,
      emblemPath: character.emblemPath,
      title: await getTitleDetails(character),
      stats: await getDetailsAll(character.stats, 'DestinyStatDefinition', (stat, details) => {
        return {
          ...details.displayProperties,
          value: stat
        }
      }),
      equipment: await getGuardianEquipmentDetails(data.characterEquipment.data[character.characterId].items),

      // Uncomment these next two lines, AND the API call for stats further up to send stats along with the character data call 
      // pvpStats,
      // pveStats,

      // Uncomment this to get all account stats along with the API call up above to send kill stats along for the ride
      // historicalStats
    }
  }))
  return charactersWithDetails;
};

// ROUTES:

// Download current sqlite DB from Bungie
//TODO: Learn enough node to download this and name it/replace current database.sqlite3
router.use('/manifest', async (req, res, next) => {
  const paths = await fetch('https://www.bungie.net/Platform/Destiny2/Manifest', { headers }).then(res => res.json());
  const dbPath = `https://www.bungie.net${paths.Response.mobileWorldContentPaths.en}`;
  res.redirect(dbPath);
});

//Search for profiles
router.use('/search/:displayName', async (req, res, next) => {
  const searchQuery = await fetch(
    `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/All/${req.params.displayName}/`,
    { headers }).then(res => res.json());
  const responseStatus = checkStatus(searchQuery);
  if (responseStatus) {
    const accountList = {
      status: 200,
      accounts: searchQuery.Response
    };
    res.send(JSON.stringify(accountList));
  } else {
    res.send(JSON.stringify(searchQuery.Message));
  }
});

// Get data for all characters on a selected account
router.use('/characters/:membershipType/:membershipId', async (req, res, next) => {
  const accountData = await fetch(
    `https://www.bungie.net/Platform/Destiny2/${req.params.membershipType}/Profile/${req.params.membershipId}/?components=100,104,200,205,300,304,305,1100`,
    { headers }).then(res => res.json());
  const responseStatus = checkStatus(accountData);
  // console.log(accountData);
  if (responseStatus) {
    const characters = await processCharacters(accountData.Response);
    const profileInfo = {
      status: 200,
      test: 'test',
      characters: characters,

      // Uncomment this to get all the original API data in case you want to dig in and look for more things to display.
      // profileData: accountData.Response,

      // I'm not sure of the use case for plug sets just yet. I think it might be used to show what possible 
      // sockets can be available on a given item.
      // plugs: await getDetailsAll(accountData.Response.profilePlugSets.data.plugs, 'DestinyPlugSetDefinition'),

    };
    res.send(JSON.stringify(profileInfo));
  } else {
    const ErrorResponse = {
      status: 404,
      ...accountData
    }
    res.send(JSON.stringify(ErrorResponse));
  }
});

module.exports = router;