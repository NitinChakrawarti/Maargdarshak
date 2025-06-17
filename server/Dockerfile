# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy environment variables (optional)
# COPY .env* ./

# Copy rest of the code
COPY . .

# Expose the port
EXPOSE 4000

# Start the server
CMD ["node", "index.js"]
