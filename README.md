# FullCycle Challenge02 - Docker and Go
Repo containing the challenge 02 from FullCycle 2.0 course (Code Education by School of Net)

## 🎯 The Challenge
The challenge consists of:
- Create a NodeJS app which insert a name on a MySQL table called "people" everything it's accessed. Then display an h1 tag with "Full Cyle Rocks!" all the names already inserted.
- Use [nginx](https://www.nginx.com/) as a proxy to call the NodeJS app. The URL http://localhost:8080 must call the NodeJS app.
- Create a docker-compose file to make it all happen.

## How it works
There are 3 different containers:
- app: contains the NodeJs app
- db: contains the database where the NodeJs app will insert and retrieve the data
- nginx: will deal the URL call

The `app` container is using [Dockerize](https://github.com/jwilder/dockerize) to wait the `db` container to be up and running. When a request to http://localhost:8080 is made, the `nginx` container will redirect to the `app` container on port 3000. Then the NodeJs app wil be executed. Data will be saved on the `db` container.

## Setting up [MySQL](https://www.mysql.com/)
For the MySQL container there is a predefined SQL script to create the table called "people". It's located on the `init_file` folder. In the docker-compose file there are the following commands: 
```
...
    volumes:
      - ./mysql/database:/var/lib/mysql
      - ./mysql/init_file:/docker-entrypoint-initdb.d
...
``` 
The first command it's used to persist the data when the container is gone. The second command is used to create the table "people" if it does not exists. 

## Setting up [NodeJs](https://nodejs.org/en/)
The NodeJs docker file contains the following instructions:
- Copy the current directory to the container
- Wait the MySQL container to be up and running
- Install the NodeJs app dependecies

## Setting up [Nginx](https://www.nginx.com/)
In the Dockefile for Nginx the default.conf file is removed and then replaced by a new config file. This config file has specific instructions to call the NodeJS app on port 3000. Pay attention to this line:
```
...
proxy_pass http://app:3000
...
```

In this line Nginx will look for the container called `app` on port 3000.

## Running instructions
Clone this repository and then run `docker-compose up -d --build`. After that access the URL http://localhost:8080.
