const axios = require('axios');

const MCP_URL = 'http://localhost:3000';
const SCREENSHOT_PATH = 'login_screenshot.png';

(async () => {
  try {
    // 1. Start browser
    await axios.post(`${MCP_URL}/start`);
    console.log('Browser started');

    // 2. Navigate to login page
    await axios.post(`${MCP_URL}/navigate`, {
      url: 'https://www.saucedemo.com/'
    });
    console.log('Navigated to login page');

    // 3. Login
    await axios.post(`${MCP_URL}/login`, {
      username: 'standard_user',
      password: 'secret_sauce'
    });
    console.log('Login attempted');

    // 4. Take screenshot
    await axios.post(`${MCP_URL}/screenshot`, {
      path: SCREENSHOT_PATH
    });
    console.log(`Screenshot saved as ${SCREENSHOT_PATH}`);

    // 5. Close browser
    await axios.post(`${MCP_URL}/close`);
    console.log('Browser closed');
  } catch (err) {
    console.error('Test failed:', err.response ? err.response.data : err.message);
  }
})(); 