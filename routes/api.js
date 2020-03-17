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


router.use('/search/:displayName', async (req, res, next) => {
  const searchQuery = await fetch(
    `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/All/${req.params.displayName}/`,
    { headers }).then(res => res.json());
  const responseStatus = checkStatus(searchQuery);
  if (responseStatus) {
    const accountList = {
      accounts: searchQuery.Response
    };
    res.send(JSON.stringify(accountList));
  } else {
    res.send(JSON.stringify(searchQuery.Message));
  }
});

module.exports = router;