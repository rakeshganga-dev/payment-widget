# Step 1: Build the app in a node environment
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the production build
RUN npm run build

# Step 2: Serve the app using a lightweight web server (e.g., Nginx or serve)
FROM nginx:alpine

# Copy the build folder from the build stage to the Nginx server folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to be able to access the app from outside the container
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
