const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config();
const APIKEY = process.env.APIKEY;

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

const getFromDB = async (hash, table) => {
  return await new Promise(resolve => {
    db.get(`SELECT json FROM ${table} WHERE id = ${convertHash(hash)}`, (err, row) => {
      if (err) {
        console.log(err);
        return console.error(err.message);
      }
      resolve(JSON.parse(row.json));
    })
  })
}

const headers = {
  "X-API-KEY": APIKEY,
}

function checkStatus(res) {
  // Bungie has a ton of ErrorCode possibilities, 1 = success!
  if (res.ErrorCode === 1) {
    return true
  } else {
    return false;
  }
}

function getDetails(bungieData) {

}

router.use('/manifest', async (req, res, next) => {
  const paths = await fetch('https://www.bungie.net/Platform/Destiny2/Manifest', { headers }).then(res => res.json());
  const dbPath = `https://www.bungie.net${paths.Response.mobileWorldContentPaths.en}`;
  res.redirect(dbPath);
});


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

router.use('/characters/:membershipType/:membershipId', async (req, res, next) => {
  const accountData = await fetch(
    `https://www.bungie.net/Platform/Destiny2/${req.params.membershipType}/Profile/${req.params.membershipId}/?components=100,200,205,300,304,305`,
    { headers }).then(res => res.json());
  const responseStatus = checkStatus(accountData);
  if (responseStatus) {

    const profileInfo = {
      status: 200,
      profileData: accountData.Response
    };
    res.send(JSON.stringify(profileInfo));
  } else {
    res.send(JSON.stringify(accountData.Message));
  }
});

module.exports = router;