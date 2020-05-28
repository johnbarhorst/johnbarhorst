const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/api.js');
const { developmentErrors } = require('./controllers/errorHandlers')
require('dotenv').config({ path: '.env' });

const serverListenTime = function () {
  const now = new Date();
  const addZero = i => {
    return i < 10 ? '0' + i : i;
  }
  const time = `${addZero(now.getHours())}:${addZero(now.getMinutes())}:${addZero(now.getSeconds())}`;
  return time;
}


// Routes

app.use(express.static(path.join(__dirname, '/client/build')));
app.use('/api', api);

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(developmentErrors);
}

// production error handler
// app.use(productionErrors);

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => console.log(`Listening on port: ${app.get('port')} at ${serverListenTime()}`));