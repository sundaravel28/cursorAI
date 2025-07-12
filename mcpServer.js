const express = require('express');
const { chromium } = require('playwright');
const fs = require('fs');

const app = express();
app.use(express.json());

let browser, page;

// Start browser and open a new page
app.post('/start', async (req, res) => {
  try {
    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
    res.json({ status: 'Browser started' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Navigate to a URL
app.post('/navigate', async (req, res) => {
  const { url } = req.body;
  try {
    if (!page) return res.status(400).json({ error: 'Browser not started' });
    await page.goto(url);
    res.json({ status: `Navigated to ${url}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login to the page
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!page) return res.status(400).json({ error: 'Browser not started' });
    await page.fill('input#user-name', username);
    await page.fill('input#password', password);
    await page.click('input#login-button');
    await page.waitForTimeout(2000); // Wait for login to process
    res.json({ status: 'Login attempted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Take a screenshot
app.post('/screenshot', async (req, res) => {
  const { path } = req.body;
  try {
    if (!page) return res.status(400).json({ error: 'Browser not started' });
    await page.screenshot({ path });
    res.json({ status: `Screenshot saved to ${path}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Close browser
app.post('/close', async (req, res) => {
  try {
    if (browser) await browser.close();
    browser = null;
    page = null;
    res.json({ status: 'Browser closed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`MCP server running on port ${PORT}`);
}); 