const { getDetailsAll, getFromDB } = require('./dbHandlers');
const {
  getSocketDetails,
  handleArmor,
  handleClanBanner,
  handleEmblem,
  handleEmote,
  handleFinisher,
  handleGhost,
  handleItemTypeZero,
  handleSeasonalArtifact,
  handleShip,
  handleSubClass,
  handleVehicle,
  handleWeapon,

} = require('./itemHandlers');

// A giant mess of a function that returns a whole bunch of character data, processed with live data
// from the API, as well as static data from the sqlite database.
const processCharacters = async (data) => {

  // Take the character ID numbers for each guardian and put them in an array,
  // We use them down below with a map function to then gather all the details on all the items.
  const characterArray = Array.from(Object.values(data.characters.data));

  // shorthand for parts of the data object from bungie
  // instanced data for the whole account comes in one bunch. Which character currently has it is determined on a
  // character level. There is a mass of data in this scope, then sort it into each character below.
  const instances = data.itemComponents.instances.data;
  const sockets = data.itemComponents.sockets.data;
  const modifiedStats = data.itemComponents.stats.data;
  const characterPlugSets = data.characterPlugSets.data;

  // Get details on all equipment items from the DB and match them up with instanced data from Bungie's api:
  const getGuardianEquipmentDetails = async equipment => {
    const itemsWithDetails = await Promise.all(equipment.map(async item => {

      // Handle items with unique props through itemHandlers.
      const handleItemEnum = {
        0: 'none',
        1: 'currency',
        2: handleArmor,
        3: handleWeapon,
        7: 'message',
        8: 'engram',
        9: 'consumable',
        10: 'exchangeMaterial',
        11: 'missionReward',
        12: 'questStep',
        13: 'questStepComplete',
        14: handleEmblem,
        15: 'quest',
        16: handleSubClass,
        17: handleClanBanner,
        18: 'aura',
        19: 'mod',
        20: 'dummy',
        21: handleShip,
        22: handleVehicle,
        23: handleEmote,
        24: handleGhost,
        25: 'package',
        26: 'bounty',
        27: 'wrapper',
        28: handleSeasonalArtifact,
        29: handleFinisher,
      }

      try {
        // Take each item and get static details from the database
        const details = await getFromDB(item.itemHash, 'DestinyInventoryItemDefinition');
        const { itemCategoryHashes } = details;

        // Right now artifacts come up as itemType: 0, though Bungie has them in the enum as 28.
        // TODO: Also, Emote Collection. I gotta handle that better.
        const itemType = details.itemType || handleItemTypeZero(details);

        // Match up the item with its instanced data
        const instanceDetails = instances[item.itemInstanceId];

        // Match up item stats with its instanced data, if no instanced data, return an empty object
        // so that later on there aren't errors. Allows for easier processing of all the data.

        const instancedStats = (modifiedStats[item.itemInstanceId] || { stats: {} }).stats;
        const detailedItemCategoryHashes = await Promise.all(
          itemCategoryHashes.map(async hash => await getFromDB(hash, 'DestinyItemCategoryDefinition')));

        // Match up item sockets with its instanced data, if no instanced data, return an empty array,
        // so that later on a .map() will return nothing instead of throwing an error.
        const instancedSockets = (sockets[item.itemInstanceId] || { sockets: [] }).sockets;

        // Get definitions for instanced stats on the item from the DB, and return the details we want from each.
        const detailedStats = await getDetailsAll(instancedStats, 'DestinyStatDefinition', async (item, details) => {
          return {
            //uncomment the lines below to send along original item data and/or database details
            ...item,
            ...details.displayProperties,
            index: details.index,
            dbDetails: { ...details },
          };
        });

        // Get stat group hash details from DB and sync the display up with each stat.
        const statGroupHash = details.stats.statGroupHash ?
          await getFromDB(details.stats.statGroupHash, 'DestinyStatGroupDefinition') : null;

        let instanceStats;

        if (statGroupHash) {
          const statDisplayObject = statGroupHash.scaledStats.reduce((obj, stat) => {
            obj[stat.statHash] = { ...stat }
            return obj
          }, {});
          instanceStats = detailedStats.map(stat => {
            return {
              ...stat,
              ...statDisplayObject[stat.statHash]
            }
          });
        } else {
          instanceStats = detailedStats;
        }

        // Trying to better organize all the various differences in items. Not sure it's really working out just yet.
        const itemSpecificProps = await handleItemEnum[itemType](details, item, instanceDetails) || {};

        // Take all the processed data to return only what we want to display.
        return {
          ...details.displayProperties,
          instanceStats,
          itemType,
          itemTypeDisplayName: details.itemTypeDisplayName,
          itemHash: item.itemHash,
          screenshot: details.screenshot,
          displaySource: details.displaySource,
          detailedItemCategoryHashes,
          ...itemSpecificProps,

          // Not all items have sockets
          sockets: instancedSockets ? await getSocketDetails(instancedSockets) : null,
          // State: none is 0, locked is 1, masterworked is 4. So locked and master worked is 5
          masterwork: item.state === 4 || item.state === 5 ? true : false,
          lore: details.loreHash ? (await getFromDB(details.loreHash, 'DestinyLoreDefinition')).displayProperties.description : null,
          // Uncomment these to see all the original data, in case you want to dig and find other things to display
          originalData: { ...item },
          originalInstance: { ...instanceDetails },
          // originalInstanceStats: { ...instancedStats },
          originalSockets: { ...instancedSockets },
          originalDetails: { ...details },
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


    // Match characterId to the equipment object, and run it through the monster function above.
    const equipment = await getGuardianEquipmentDetails(data.characterEquipment.data[character.characterId].items);

    // Still working out what exactly plug sets are.
    // Match characterId to the plugSet object.
    const plugSets = characterPlugSets[characterId].plugs;
    const getPlugSetDetails = async plugs => {
      let detailedPlugs = {}
      const keyArray = Array.from(Object.keys(plugs));


    }
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
      stats: await getDetailsAll(stats, 'DestinyStatDefinition', async (stat, details) => {
        return {
          ...details.displayProperties,
          value: stat
        }
      }),
      equipment,
      plugSets,
    }
  }))
  return charactersWithDetails;
};

module.exports = { processCharacters };