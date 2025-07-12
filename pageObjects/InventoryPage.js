const axios = require('axios');

class InventoryPage {
  constructor(mcpUrl) {
    this.mcpUrl = mcpUrl;
  }

  async takeScreenshot(path = 'inventory_screenshot.png') {
    await axios.post(`${this.mcpUrl}/screenshot`, { path });
  }
}

module.exports = InventoryPage; 