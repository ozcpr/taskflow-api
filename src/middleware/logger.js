// Logger middleware: her isteğin method, endpoint ve zaman damgasını
// hem konsola hem de logs/requests.log dosyasına yazar.
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '..', '..', 'logs');
const logFile = path.join(logDir, 'requests.log');

function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${req.method} ${req.originalUrl}`;

  console.log(line);

  fs.mkdir(logDir, { recursive: true }, (dirErr) => {
    if (dirErr) return;
    fs.appendFile(logFile, line + '\n', () => {});
  });

  next();
}

module.exports = logger;
