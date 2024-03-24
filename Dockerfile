# Use the official Node.js  LTS (Long Term Support) image as a base
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app/fe

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app to the working directory
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
