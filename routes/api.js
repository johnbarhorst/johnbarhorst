const router = require('express').Router();

router.use('/search', (req, res, next) => {
  const json = JSON.stringify({ result: 'Test' });
  res.send(json);
});

module.exports = router;