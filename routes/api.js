const router = require('express').Router();
const destinyControllers = require('../controllers/destinyControllers');
const { catchErrors } = require('../controllers/errorHandlers');

// ROUTES:

// Download current sqlite DB from Bungie
//TODO: Learn enough node to download this and name it/replace current database.sqlite3
router.get('/manifest', destinyControllers.getCurrentManifest);

//Search for profiles
router.get('/search/:displayName/:page', destinyControllers.searchAccounts);

// Get data for all characters on a selected account
router.get('/characters/:membershipType/:membershipId', catchErrors(destinyControllers.getCharacterInfo));

router.get('/settings', destinyControllers.getCommonSettings);

module.exports = router;