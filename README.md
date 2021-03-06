# FullCycle Challenge02 - Docker + NodeJs + MySQL + Nginx
Repo containing the challenge 02 from FullCycle 2.0 course (Code Education by School of Net)

## The Challenge 🎯
The challenge consists of:
- Create a NodeJS app which insert a name on a MySQL table called "people" everytime it's accessed. Then display an h1 tag with "Full Cyle Rocks!" and all the names already inserted.
- Use [nginx](https://www.nginx.com/) as a proxy to call the NodeJS app. The URL http://localhost:8080 must call the NodeJS app.
- Create a [Docker Compose](https://docs.docker.com/compose/compose-file/compose-file-v3/) file to make it all happen.

## How it works 🤯
There are 3 different containers:
- app: contains the NodeJs app
- db: contains the database where the NodeJs app will insert and retrieve the data
- nginx: will deal the URL call

The `app` container is using [Dockerize](https://github.com/jwilder/dockerize) to wait the `db` container to be up and running. When a request to http://localhost:8080 is made, the `nginx` container will redirect to the `app` container on port 3000. Then the NodeJs app wil be executed. Data will be saved on the `db` container.

## Setting up <a href="https://www.mysql.com" target="_blank"><img src="https://labs.mysql.com/common/logos/mysql-logo.svg?v2" width="60" heigth="60" /> </a>
For the MySQL container there is a predefined SQL script to create the table called "people". It's located on the `init_file` folder. In the Docker Compose file there are the following commands: 
```
...
    volumes:
      - ./mysql/database:/var/lib/mysql
      - ./mysql/init_file:/docker-entrypoint-initdb.d
...
``` 
The first command it's used to persist the data when the container is gone. The second command is used to create the table "people" if it does not exists. 

## Setting up <a href="(https://nodejs.org/en/)" target="_blank"><img src="https://nodejs.org/static/images/logo.svg" width="60" heigth="60" /></a>
The NodeJs [Dockerfile](https://docs.docker.com/engine/reference/builder/) contains the following instructions:
- Copy the current directory to the container
- Wait the MySQL container to be up and running
- Install the NodeJs app dependencies

## Setting up <a href="https://www.nginx.com" target="_blank"> <img src="https://user-images.githubusercontent.com/33010639/110218079-67681280-7e96-11eb-8a9d-b29a65617d13.png" width="60" heigth="60" /> </a>
In the [Dockerfile](https://docs.docker.com/engine/reference/builder/) for Nginx the default.conf file is removed and then replaced by a new config file. This config file has specific instructions to call the NodeJS app on port 3000. Pay attention to this line:
```
...
proxy_pass http://app:3000
...
```

In this line Nginx will look for the container called `app` on port 3000.

## Running instructions ✅
Clone this repository and then run `docker-compose up -d`. After that, access the URL http://localhost:8080.
