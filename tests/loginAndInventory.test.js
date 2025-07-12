const LoginPage = require('../pageObjects/LoginPage');
const InventoryPage = require('../pageObjects/InventoryPage');
const axios = require('axios');
const config = require('../utils/config');

// Ensure MCP server is running before running this test

test('Login and Inventory Screenshot Test', async () => {
  await axios.post(`${config.mcpUrl}/start`);
  const loginPage = new LoginPage(config.mcpUrl);
  await loginPage.navigate();
  await loginPage.login(config.saucedemo.username, config.saucedemo.password);
  console.log('Login attempted');

  const inventoryPage = new InventoryPage(config.mcpUrl);
  await inventoryPage.takeScreenshot(config.screenshotPath);
  console.log('Inventory screenshot taken');

  await axios.post(`${config.mcpUrl}/close`);
  console.log('Browser closed');
}); 