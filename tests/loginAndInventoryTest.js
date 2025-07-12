const LoginPage = require('../pageObjects/LoginPage');
const InventoryPage = require('../pageObjects/InventoryPage');
const axios = require('axios');
const config = require('../utils/config');
const { writeReport } = require('../reports/customReporter');

(async () => {
  let testName = 'Login and Inventory Screenshot Test';
  try {
    // Start browser
    await axios.post(`${config.mcpUrl}/start`);
    console.log('Browser started');

    // Login
    const loginPage = new LoginPage(config.mcpUrl);
    await loginPage.navigate();
    console.log('Navigated to login page');
    await loginPage.login(config.saucedemo.username, config.saucedemo.password);
    console.log('Login attempted');

    // Inventory actions
    const inventoryPage = new InventoryPage(config.mcpUrl);
    await inventoryPage.takeScreenshot(config.screenshotPath);
    console.log('Inventory screenshot taken');

    // Close browser
    await axios.post(`${config.mcpUrl}/close`);
    console.log('Browser closed');

    // Report success
    writeReport({
      testName,
      status: 'PASS',
      screenshot: config.screenshotPath
    });
  } catch (err) {
    // Enhanced error logging
    console.error('Test failed:', err);
    writeReport({
      testName,
      status: 'FAIL',
      message: err && (err.response ? JSON.stringify(err.response.data) : err.stack || err.message || String(err)),
      screenshot: config.screenshotPath
    });
  }
})(); 