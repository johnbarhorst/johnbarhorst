const db = require('better-sqlite3')('./database.sqlite3', { readonly: true });
const { convertHash } = require('./helpers');



// sqlite db query function
const getFromDB = async (hash, table) => {
  return await new Promise(resolve => {
    const stmt = db.prepare(`SELECT json FROM ${table} WHERE id = ?`);
    const result = stmt.get(convertHash(hash));
    if (result) {
      resolve(JSON.parse(result.json));
    } else {
      console.log(`${hash} not found in ${table}`);
      resolve({ error: `${hash} not found in ${table}` });
    }
  })
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

//Gets details for an items primary stats, if there is one. This is usually Attack/Defence and just another name
// for their light level. Exceptions for sparrows and artifacts.
const getPrimaryStatDetails = async stat => {
  const details = await getFromDB(stat.statHash, 'DestinyStatDefinition');
  return {
    ...details.displayProperties,
    value: stat.value,
  }
}

module.exports = { getFromDB, getDetailsAll, getPrimaryStatDetails }