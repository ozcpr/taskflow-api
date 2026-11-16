// Basit veri katmanı: görevler tasks.json dosyasında saklanır.
const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'tasks.json');

function readTasks() {
  try {
    return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  } catch (err) {
    return [];
  }
}

function writeTasks(tasks) {
  fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
}

module.exports = { readTasks, writeTasks };
