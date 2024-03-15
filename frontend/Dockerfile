# Use an official Node.js runtime as a base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port on which the React app will run (default is 3000)
EXPOSE 3000

# Run the React app
CMD ["npm", "start"]