# Use Node.js v20
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY server/package*.json ./

RUN npm install

# Bundle app source
COPY server/src ./src

# Expose the port
EXPOSE 8080

# Command to run the app
CMD [ "node", "./src/server.js" ]
