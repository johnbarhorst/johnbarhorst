const express = require('express');
const app = express();
const path = require('path');
const port = 3001;

const serverListenTime = function () {
  const now = new Date();
  const addZero = i => {
    return i < 10 ? '0' + i : i;
  }
  const time = `${addZero(now.getHours())}:${addZero(now.getMinutes())}:${addZero(now.getSeconds())}`;
  return time;
}

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(port, console.log(`Listening on port: ${port} at ${serverListenTime()}`));