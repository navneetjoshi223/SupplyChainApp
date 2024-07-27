# Frontend Dockerfile

# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the application
RUN npm run build

# Serve the application
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Make port 3000 available to the world outside this container
EXPOSE 3000