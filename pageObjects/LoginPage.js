const axios = require('axios');

class LoginPage {
  constructor(mcpUrl) {
    this.mcpUrl = mcpUrl;
  }

  async navigate() {
    await axios.post(`${this.mcpUrl}/navigate`, { url: 'https://www.saucedemo.com/' });
  }

  async login(username, password) {
    await axios.post(`${this.mcpUrl}/login`, { username, password });
  }
}

module.exports = LoginPage; 