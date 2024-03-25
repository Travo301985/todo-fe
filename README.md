# Todo List Application

### Create a React application:

- Run the command `npx create-react-app todo` to set up a new React application named "todo".

### Install Tailwind CSS:

- Run `npm install -D tailwindcss` to install Tailwind CSS as a development dependency.

### Initialize Tailwind CSS:

- Run `npx tailwindcss init` to generate a default `tailwind.config.js` file in the project.

### Install PostCSS and PostCSS CLI:

- Run `npm install postcss postcss-cli` to install PostCSS and PostCSS CLI as dependencies.

### Process CSS with PostCSS:

- Run `npx postcss ./src/styles.css -o ./dist/styles.css` to process the CSS file using PostCSS. Adjust the file paths as per the project structure.

### Install React Query:

- Run `npm i react-query` to install React Query, which provides data fetching and caching functionality for the application.

### Install React Router:

- Run `npm install react-router-dom` to install React Router, which enables client-side routing for the application.

### Install React Spinners:

- Run `npm i react-spinners` to install React Spinners, which provides pre-built loading spinners for visual feedback.

### Install React Toastify:

- Run `npm i react-toastify` to install React Toastify, a notification library for displaying toast messages in the application.

### Install Auth0 React SDK:

    - Run `npm install @auth0/auth0-react` to install the Auth0 React SDK, which allows you to integrate Auth0 authentication into the application.

### Install React Icons:

    - Run `npm i react-icons` to install React Icons, a popular library that provides a wide range of icons for the UI.

### Update package.json:

    - In the `package.json` file, under the "dependencies" section, add the following dependencies with their respective versions

### Use ngrok:

    - Integrate ngrok into the application to expose the local server to the internet for testing and demonstration purposes. Refer to the ngrok documentation for specific instructions.

### Use Context API:

    - Implement the Context API to manage state and share data between components in the application. Create a context provider and consumer to encapsulate and access shared data.

### Use Higher-Order Component (HOC):

    - Created a Higher-Order Component that adds additional functionality or behavior to the existing components. This can be used for tasks such as authentication, data fetching, or handling certain aspects of the application's logic.

### Write Jest tests for the dashboard:

    - Used the Jest testing framework to write tests for the dashboard component of the Todo List Application. Wrote unit tests that cover different scenarios and ensure the component behaves as expected.

## Deployment Setup

### Digital Oceans Deployment
* Droplet username: root, password: FR#5^dJzLbaw
* Hostname: ubuntu-todo-list
* IP address: 134.209.229.54, 172.18.0.2

### Docker Setup
* `sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io`
* `sudo docker network create mynetwork` - c6d55077fe3c37d5e00aaf0552cbb8051ef7f80e985cd675b5b469d410bb981c

### Postgres databse container setup
* `sudo docker pull postgres`
* `sudo docker run -d --name postgres-container --net=mynetwork -e POSTGRES_PASSWORD=Password_123 -p 5432:5432 postgres` - 92253661b1d2ded09c52c8730b3739282b69bedaae4b91b2be9a7e39ae9378ea
* `sudo docker logs postgres-container`
* `sudo apt install postgresql-client-common`
* `sudo apt install postgresql-client
* `psql -h 134.209.229.54 -p 5432 -U postgres` -- Password: Password_123
#### Creating the database
* `docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres-container`
* `CREATE DATABASE todo;`
* `\l`
* `\c todo` - then create the tables
* `\dt`

### Node.JS backend setup
* `cd .. && cd home && git clone https://github.com/Travo301985/todo-be.git && cd todo-be`
* `docker build -t todo-be-image .` - from the Dockerfile
* `docker run -d -p 4000:4000 --name todo-be-container todo-be-image`

### React.JS backend setup
* `cd .. && cd home && git clone https://github.com/Travo301985/todo-fe.git && cd todo-fe`
* `docker build -t todo-fe-image .` - from the Dockerfile
* `docker run -d -p 3000:80 --name todo-fe-container todo-fe-image`

### SSL configuration
* `sudo apt install snapd`
* `sudo snap install --classic certbot`
* `apt install nginx`
* `sudo certbot --nginx`
* acquring a domain name
* `docker exec -it todo-fe-container /bin/sh` and `vi /etc/nginx/nginx.conf` to edit the nginx.config file
* proxy the default server nginx to the docker container

