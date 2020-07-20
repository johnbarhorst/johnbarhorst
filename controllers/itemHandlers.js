const {
  getDetailsAll,
  getFromDB,
  getPrimaryStatDetails,
} = require('./dbHandlers');


// All these empty functions are for future use cases. Each item can have it's own properties processed
// without polluting up the general item function.

// Feels messy for now, but I think as I find more useful things (especially on the bigger app) this will pay off.

const handleArmor = async (details, item, instanceDetails) => {

  const primaryStat = await getPrimaryStatDetails(instanceDetails.primaryStat);
  // Armor Energy definitions from DB along with the instanced data from API
  // Armor 1.0 versions have no energy type. Thus, we must account for this.
  const getEnergyDetails = async energyInfo => {
    try {
      const details = await getFromDB(energyInfo.energyTypeHash, 'DestinyEnergyTypeDefinition');
      return {
        ...details.displayProperties,
        transparentIconPath: details.transparentIconPath,
        capacity: energyInfo.energyCapacity,
        used: energyInfo.energyUsed,
        unused: energyInfo.energyUnused,
        energyType: energyInfo.energyType,
        dbDetails: { ...details },
        firstGen: false
      }
    } catch (error) {
      return {
        firstGen: true
      }
    }
  }
  const statGroupHash = await getFromDB(details.stats.statGroupHash, 'DestinyStatGroupDefinition');

  return {
    energy: await getEnergyDetails(instanceDetails.energy),
    primaryStat,
    statGroupHash,
  }
}

const handleClanBanner = async (details, item, instanceDetails) => {
  return {

  }
}
const handleEmblem = async (details, item, instanceDetails) => {
  return {

  }
}

const handleEmote = async (details, item, instanceDetails) => {
  return {

  }
}

const handleFinisher = async (details, item, instanceDetails) => {
  return {

  }
}

const handleGhost = async (details, item, instanceDetails) => {
  return {

  }
}

const handleSeasonalArtifact = async (details, item, instanceDetails) => {
  const primaryStat = await getPrimaryStatDetails(instanceDetails.primaryStat);
  return {
    primaryStat
  }
}

const handleShip = async (details, item, instanceDetails) => {
  return {

  }
}

const handleSubClass = async (details, item, instanceDetails) => {
  return {

  }
}

const handleVehicle = async (details, item, instanceDetails) => {
  return {

  }
}

const handleWeapon = async (details, item, instanceDetails) => {
  const { damageType } = instanceDetails;
  const ammoType = details.equippingBlock.ammoType;
  const primaryStat = await getPrimaryStatDetails(instanceDetails.primaryStat);
  const staticStats = await getDetailsAll(details.stats.stats, 'DestinyStatDefinition', async (stat, details) => {
    return {
      ...stat,
      ...details.displayProperties,
      index: details.index,
      dbDetails: { ...details }
    }
  });


  const statGroupHash = await getFromDB(details.stats.statGroupHash, 'DestinyStatGroupDefinition');

  return {
    ammoType,
    damageType,
    primaryStat,
    statGroupHash,
    staticStats,
  }
}


// Socket definitions from the DB for instanced items from the API
// We don't use getDetailsAll here because the values are the hashes for sockets, not the object keys.
const getSocketDetails = async sockets => {

  // TODO: Some sockets, like current seasonal artifact perks, need the perk definition info to get the description
  const values = Array.from(Object.values(sockets));
  const details = await Promise.all(values.map(async socket => {
    // There are some sockets in every bunch that are visible: false, enabled: false, and have no hash.
    // Not much we can do with that, eh?
    if (!socket.plugHash) {
      return {
        ...socket,
        test: 'test'
      }
    }
    const data = await getFromDB(socket.plugHash, 'DestinyInventoryItemDefinition');
    const displayProperties = data.displayProperties || {};
    return {
      ...socket,
      ...displayProperties,
      originalDetails: { ...data }
    }
  }))
  return details;
}

const handleItemTypeZero = item => {
  // For whatever reason, this season (Arrivals) the artifact comes up as itemType: 0
  if (item.itemTypeDisplayName === 'Artifact') {
    return 28
  }

  // TODO: This is just for me, right now. Technically, an emote is it's own thing, the collection should be itemType: 0
  if (item.itemTypeDisplayName === 'Emote Collection') {
    return 23
  }

  return 0
}

module.exports = {
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
}