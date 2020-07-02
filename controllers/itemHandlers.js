const {
  getDetailsAll,
  getFromDB,
  getPrimaryStatDetails,
} = require('./dbHandlers');

const handleArmor = async (details, item, instanceDetails) => {
  const primaryStat = await getPrimaryStatDetails(instanceDetails.primaryStat);
  // Armor Energy definitions from DB along with the instanced data from API
  const getEnergyDetails = async item => {
    const details = await getFromDB(item.energyTypeHash, 'DestinyEnergyTypeDefinition');
    return {
      ...details.displayProperties,
      transparentIconPath: details.transparentIconPath,
      capacity: item.energyCapacity,
      used: item.energyUsed,
      unused: item.energyUnused,
      dbDetails: { ...details }
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


  const statGroupHash = await getFromDB(details.stats.statGroupHash, 'DestinyStatGroupDefinition');

  return {
    ammoType,
    damageType,
    primaryStat,
    statGroupHash,
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