const db = require('better-sqlite3')('./database.sqlite3', { readonly: true });
const { convertHash } = require('./helpers');



// sqlite db query function
const getFromDB = exports.getFromDB = async (hash, table) => {
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


exports.getDetailsAll = async (object, table, callback) => {
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