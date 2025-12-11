const fs = require("fs");
const path = require("path");
const { marked } = require("marked");


function mdToHtml(md) {
  return marked(md);
}

function ensureDataFile(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([]));
}

function saveRecord(filePath, record) {
  ensureDataFile(filePath);
  const arr = JSON.parse(fs.readFileSync(filePath));
  arr.push(record);
  fs.writeFileSync(filePath, JSON.stringify(arr, null, 2));
}

module.exports = { mdToHtml, saveRecord, ensureDataFile };
