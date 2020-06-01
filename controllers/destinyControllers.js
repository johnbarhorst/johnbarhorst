const https = require('https');
const fetch = require('node-fetch');
const fs = require('fs');
const unzip = require('unzipper');
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
    try {
      const details = await getFromDB(hash, table);
      if (callback) {
        return callback(object[hash], details);
      } else {
        return {
          ...object[hash],
          details
        };
      }
    } catch {
      return {
        ...object[hash],
        error: 'Item not found'
      }
    }
  }));
  return objectWithDetails;
}


// A giant mess of a function that returns a whole bunch of character data, processed with live data
// from the API, as well as static data from the sqlite database.
const processCharacters = async (data) => {

  // Take the character ID numbers for each guardian and put them in an array,
  // We use them down below with a map function to then gather all the details on all the items.
  const characterArray = Array.from(Object.values(data.characters.data));

  const damageTypeEnum = [null, 'kinetic', 'arc', 'solar', 'void', 'raid'];
  //const energyTypeEnum = [null, 'arc', 'solar', 'void']; // So far looks like armor already has this info in the energy db entry.

  // shorthand for parts of the data object from bungie
  // instanced data for the whole account comes in one bunch. Which character currently has it is determined on a
  // character level. There is a mass of data in this scope, then sort it into each character below.
  const instances = data.itemComponents.instances.data;
  const sockets = data.itemComponents.sockets.data;
  const stats = data.itemComponents.stats.data;

  // Get details on all equipment items from the DB and match them up with instanced data from Bungie's api:
  const getGuardianEquipmentDetails = async equipment => {
    const itemsWithDetails = await Promise.all(equipment.map(async item => {
      try {
        // Take each item and get static details from the database
        const details = await getFromDB(item.itemHash, 'DestinyInventoryItemDefinition');

        // Match up the item with its instanced data
        const instanceDetails = instances[item.itemInstanceId];

        // Match up item stats with its instanced data, if no instanced data, return an empty object
        // so that later on there aren't errors. Allows for easier processing of all the data.
        const instancedStats = (stats[item.itemInstanceId] || { stats: {} }).stats;

        // Match up item sockets with its instanced data, if no instanced data, return an empty array,
        // so that later on a .map() will return nothing instead of throwing an error.
        const instancedSockets = (sockets[item.itemInstanceId] || { sockets: [] }).sockets;

        // Get definitions for instanced stats on the item from the DB, and return the details we want from each.
        const instanceStats = await getDetailsAll(instancedStats, 'DestinyStatDefinition', (item, details) => {
          return {
            //uncomment the lines below to send along original item data and/or database details
            // originalData: {...item},
            // dbDetails: {...details},
            ...details.displayProperties,
            value: item.value,
            displayMaximum: item.displayMaximum,
          };
        });

        //Gets details for an items primary stats, if there is one. This is usually Attack/Defence and just another name
        // for their light level. Exceptions for sparrows and artifacts.
        const getPrimaryStatDetails = async stat => {
          const details = await getFromDB(stat.statHash, 'DestinyStatDefinition');
          return {
            ...details.displayProperties,
            value: stat.value,
          }
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
        // We don't use getDetailsAll here because the values are the hashes for sockets, not the object keys.
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

        // Take all the processed data to return only what we want to display.
        return {
          itemHash: item.itemHash,
          ...details.displayProperties,
          screenshot: details.screenshot,
          itemTypeDisplayName: details.itemTypeDisplayName,
          displaySource: details.displaySource,
          instanceStats: instanceStats,
          itemType: details.itemType,
          damageType: damageTypeEnum[instanceDetails.damageType],
          // Only armor has energy right now.
          energy: instanceDetails.energy ? await getEnergyDetails(instanceDetails.energy) : null,
          // Not all items have sockets
          sockets: instancedSockets ? await getSocketDetails(instancedSockets) : null,
          itemCategoryHashes: await Promise.all(details.itemCategoryHashes.map(async hash => await getFromDB(hash, 'DestinyItemCategoryDefinition'))),
          // State: none is 0, locked is 1, masterworked is 4. So locked and master worked is 5
          masterwork: item.state === 4 || item.state === 5 ? true : false,
          primaryStat: instanceDetails.primaryStat ? await getPrimaryStatDetails(instanceDetails.primaryStat) : null,
          // Uncomment these to see all the original data, in case you want to dig and find other things to display
          // originalData: { ...item },
          // originalInstance: { ...instanceDetails },
          // originalInstanceStats: { ...instancedStats },
          // originalSockets: { ...instancedSockets },
          // originalDetails: { ...details },
        };

      } catch {
        // TODO: So far, the only issues I've had invole having an outdated manifest DB from bungie.
        // Likely this isn't the only error possible, but for now this is a decent catch.
        return {
          ...item,
          errorMessage: 'Probably need to update the database'
        }
      }
    }))
    return itemsWithDetails;
  }



  // Take the array of character IDs from way up top, and 
  const charactersWithDetails = await Promise.all(characterArray.map(async character => {
    // Destructure all the stuff we're gonna use
    const {
      membershipId,
      membershipType,
      characterId,
      dateLastPlayed,
      minutesPlayedThisSession,
      minutesPlayedTotal,
      light,
      raceType,
      genderType,
      classType,
      emblemBackgroundPath,
      emblemPath,
      stats
    } = character;

    // References as listed on in the API docs. All sources say this info is highly unlikely to change, however if
    // you start getting the wrong info, you can double check at https://bungie-net.github.io/multi/
    const classTypeRef = ["Titan", "Hunter", "Warlock"];
    const genderTypeRef = ["Male", "Female"];
    const raceTypeRef = ["Human", "Awoken", "Exo"];

    const equipment = await getGuardianEquipmentDetails(data.characterEquipment.data[character.characterId].items);

    // Look up character title details
    const getTitleDetails = async character => {
      const details = character.titleRecordHash ? await getFromDB(character.titleRecordHash, 'DestinyRecordDefinition') : null;
      if (details) {
        return {
          ...details.displayProperties,
          hasTitle: details.titleInfo.hasTitle,
          titlesByGender: { ...details.titleInfo.titlesByGender }
        }
      } else {
        return {
          hasTitle: false
        }
      }
    }

    return {
      membershipId,
      membershipType,
      characterId,
      dateLastPlayed,
      minutesPlayedThisSession,
      minutesPlayedTotal,
      light,
      race: raceTypeRef[raceType],
      gender: genderTypeRef[genderType],
      classType: classTypeRef[classType],
      emblemBackgroundPath,
      emblemPath,
      title: await getTitleDetails(character),
      stats: await getDetailsAll(stats, 'DestinyStatDefinition', (stat, details) => {
        return {
          ...details.displayProperties,
          value: stat
        }
      }),
      equipment,
    }
  }))
  return charactersWithDetails;
};

exports.getCharacterInfo = async (req, res) => {
  const accountData = await fetch(
    `https://www.bungie.net/Platform/Destiny2/${req.params.membershipType}/Profile/${req.params.membershipId}/?components=100,104,200,205,300,304,305,1100`,
    { headers }).then(result => result.json());
  const responseStatus = checkStatus(accountData);
  console.log(accountData);
  if (responseStatus) {
    const characters = await processCharacters(accountData.Response);
    const profileInfo = {
      test: 'test',
      characters: characters,

      // Uncomment this to get all the original API data in case you want to dig in and look for more things to display.
      // profileData: accountData.Response,

      // I'm not sure of the use case for plug sets just yet. I think it might be used to show what possible 
      // sockets can be available on a given item.
      // plugs: await getDetailsAll(accountData.Response.profilePlugSets.data.plugs, 'DestinyPlugSetDefinition'),

    };
    res.status(200);
    res.json(profileInfo);
  } else {
    const ErrorResponse = {
      message: accountData.Message
    }
    res.status(404);
    res.json(ErrorResponse);
  }
}

exports.getCurrentManifest = async (req, res) => {
  // Get path to current D2 database
  const paths = await fetch('https://www.bungie.net/Platform/Destiny2/Manifest', { headers }).then(result => result.json());
  // Append to base path
  const dbPath = `https://www.bungie.net${paths.Response.mobileWorldContentPaths.en}`;
  // The last section of the path is the file name after unzipping. We need to remove the rest of the url
  const fileName = dbPath.split('').slice(dbPath.lastIndexOf('/') + 1, dbPath.length).join('');

  // TODO: Automate this as a cron job, instead of manually hitting the api.
  // Save the file name, if it matches the path, then we are up to date and can cancel out of this.

  // Download the file, then extract it. Then rename the updated DB so it works with the rest of our code.
  https.get(dbPath, response => response.pipe(fs.createWriteStream('./db.zip'))).on('close', () =>
    fs.createReadStream('./db.zip').pipe(unzip.Extract({
      path: './'
    })).on('close', () => {
      fs.renameSync(`${fileName}`, 'database.sqlite3');
      fs.unlinkSync('db.zip');
    }
    ));

  // Just sending something here to finish the browser call to the server. This shouldn't be necessary once I make it a cron job.
  res.status(200);
  res.send('Check data');
}

exports.searchAccounts = async (req, res) => {
  const searchQuery = await fetch(
    `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/All/${req.params.displayName}/`,
    { headers }).then(res => res.json());
  const responseStatus = checkStatus(searchQuery);
  if (responseStatus) {
    res.status(200);
    const accountList = {
      accounts: searchQuery.Response
    };
    res.send(JSON.stringify(accountList));
  } else {
    res.status(401);
    const errorStatus = {
      message: searchQuery.Message
    }
    res.json(errorStatus);
  }
}