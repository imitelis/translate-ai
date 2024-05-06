# Use the official Node image as a base
FROM node:18.13.0-slim AS web

RUN mkdir -p /frontend

# Add a /app work directory
WORKDIR /frontend

# Copy package.json there
COPY package.json .

# Install npm dependencies
RUN npm install

# Copy app files
COPY . /frontend

# Build prod app
# RUN npm run build

# Expose a port
EXPOSE 9000

# Starting the React app with vite
CMD [ "npm", "run", "dev" ]
# CMD [ "npm", "run", "preview" ]