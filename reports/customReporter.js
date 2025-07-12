const fs = require('fs');
const path = require('path');

const reportFile = path.join(__dirname, 'test-report.log');

function writeReport({ testName, status, message, screenshot }) {
  const entry = [
    `Test: ${testName}`,
    `Status: ${status}`,
    message ? `Message: ${message}` : '',
    screenshot ? `Screenshot: ${screenshot}` : '',
    `Timestamp: ${new Date().toISOString()}`,
    '-----------------------------'
  ].filter(Boolean).join('\n');

  fs.appendFileSync(reportFile, entry + '\n');
}

module.exports = { writeReport }; 