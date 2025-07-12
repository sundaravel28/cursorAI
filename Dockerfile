# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
# Install Playwright browsers and dependencies
RUN npx playwright install --with-deps

# Copy the rest of the project files
COPY . .

# Expose MCP server port
EXPOSE 3000

# Default command to start the MCP server
CMD ["node", "mcpServer.js"] 