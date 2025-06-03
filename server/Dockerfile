# Use Node.js base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Set environment variable (optional)
# ENV NODE_ENV=production

# Expose the port your app runs on
EXPOSE 5000

# Start the server
CMD ["node", "index.js"]
