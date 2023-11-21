# Use an official Node.js runtime as a base image
FROM node:19

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Install PM2 globally
RUN npm install -g pm2

# Expose the port on which your Node.js application will run
EXPOSE 3000

# Start the application using PM2
CMD ["pm2-runtime", "app.js"]