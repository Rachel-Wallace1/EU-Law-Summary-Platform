# Use an official Node.js runtime as a base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the remaining application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Install serve globally to serve the built React app
RUN npm install -g serve

# Expose the port on which the React app will run
EXPOSE 3000

# Command to run the React app
CMD ["serve", "-s", "build", "-l", "3000"]