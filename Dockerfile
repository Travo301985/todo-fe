# Use the official Nginx image as base
FROM nginx:alpine

# Copy the built frontend files to the default Nginx public directory
COPY build /usr/share/nginx/html

# Copy SSL/TLS certificates
COPY /etc/letsencrypt/live/todolistact.art/privkey.pem /etc/nginx/conf.d/privkey.pem
COPY /etc/letsencrypt/live/todolistact.art/fullchain.pem /etc/nginx/conf.d/fullchain.pem

# Add volumes
VOLUME /etc/nginx/certs

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose ports
EXPOSE 80
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]