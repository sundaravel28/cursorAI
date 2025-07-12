const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../config/default.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

module.exports = config; 