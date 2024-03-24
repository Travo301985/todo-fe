# Use a base image with a web server to serve the static files
FROM nginx:alpine

# Copy the built frontend files to the default Nginx public directory
COPY build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]