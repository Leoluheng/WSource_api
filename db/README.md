# Database Documentation

```
version: MySQL latest
```

## Setup

Install Docker. First create file `.env` for all the environment variables and run `source .env`.
Then run `docker compose up` in the root directory.

To rebuild the image use `docker-compose up --build`.

The command will build a container with customized mysql8.0 image from the dockerfile, which is initialized with a database as shown in the sql file on port 3306.

(alternative way to build the image and start the container through command line)

```
# build wsourcedb image from dockerfile
docker build --tag dbimage .
# start a docker container and open port 3306
docker run --name dbcontainer -p 3306:3306 -e MYSQL_ROOT_PASSWORD=<password-here> -d dbimage
```

## Shut Down

Shut down the container and clean up the volume with `docker-compose down -v`

## Access DB in Docker Container

Run command `docker exec -it dbcontainer mysql -uroot -pmy-secret-pw`

```
    mysql> use wsourcedb;
    mysql> show tables;
    mysql> describe [table name];
    mysql> select * from [table name];
```

## DB Schema

```
user
    - id
    - access_level
    - email
```

```
resource
    - id
    - title
    - created_at
    - status
    - user_id
```

```
category
    - id
    - type
```

```
resource_category
    - resource_id
    - category_id
```
