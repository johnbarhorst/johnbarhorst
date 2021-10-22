const https = require('https');
const fetch = require('node-fetch');
const fs = require('fs');
const unzip = require('unzipper');
const { processCharacters } = require('./characterHandler');
const { checkStatus } = require('./helpers');
require('dotenv').config();
const APIKEY = process.env.APIKEY;

const headers = {
  "X-API-KEY": APIKEY,
}

exports.getCharacterInfo = async (req, res) => {
  const accountData = await fetch(
    `https://www.bungie.net/Platform/Destiny2/${req.params.membershipType}/Profile/${req.params.membershipId}/?components=100,104,200,205,300,304,305,1100`,
    { headers }).then(result => result.json());
  const responseStatus = checkStatus(accountData);

  if (responseStatus) {
    const characters = await processCharacters(accountData.Response);
    const profileInfo = {
      characters: characters,

      // Uncomment this to get all the original API data in case you want to dig in and look for more things to display.
      originalData: accountData.Response,

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

  // Just sending something here to finish the browser call to the server. This shouldn't be necessary once I automate it.
  res.status(200);
  res.send('Check data');
}

// Example response from new search function. It's very specific, can't do crashxvii
// {
//   searchResults: [
//     {
//       bungieGlobalDisplayName: 'Crash XVII',
//       bungieGlobalDisplayNameCode: 8729,
//       bungieNetMembershipId: '1740551',
//       destinyMemberships: [
//        {
//          iconPath: '/img/theme/bungienet/icons/xboxLiveLogo.png',
//          crossSaveOverride: 0,
//          applicableMembershipTypes: [ 1 ],
//          isPublic: true,
//          membershipType: 1,
//          membershipId: '4611686018434143187',
//          displayName: 'Crash XVII',
//          bungieGlobalDisplayName: 'Crash XVII',
//          bungieGlobalDisplayNameCode: 8729
//        }
//      ]
//     }
//   ],
//   page: 0,
//   hasMore: false
// }



exports.searchAccounts = async (req, res) => {
  const {displayName, page} = req.params;
  try {
    const searchQuery = await fetch(
      `https://www.bungie.net/Platform/User/Search/Prefix/${displayName}/${page}/`,
      { headers }).then(res => res.json());
      console.log(searchQuery.Response);
      const responseStatus = checkStatus(searchQuery);
      if (responseStatus) {
        res.status(200);
        const accountList = {
          // Temp changes for functionality testing. This is not a solution.
          accounts: searchQuery.Response.searchResults[0].destinyMemberships
        };
        res.send(JSON.stringify(accountList));
      } else {
        res.status(401);
        const errorStatus = {
          message: searchQuery.Message
        }
        res.json(errorStatus);
      }
  } catch (error) {
    res.status(401);
    const errorStatus = {
      message: error
    }
    res.json(errorStatus);
  }
}


// There's some neat stuff in here. Not particularily useful though.
exports.getCommonSettings = async (req, res) => {
  const response = await fetch(
    `https://www.bungie.net/Platform/Settings`,
    { headers }
  ).then(res => res.json());
  res.json(response);
}