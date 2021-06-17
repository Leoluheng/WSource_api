# Database Documentation

```
version: MySQL latest
```

## Set Up

Install Docker and then run `sh setup.sh`.

The script will build a customized mysql8.0 image from the dockerfile, which is initialized with a database as shown in the sql file, and start a docker container with MySQL8.0 on port 3306.

### Access DB in Docker Container

Run command `docker exec -it dbcontainer mysql -uroot -pmy-secret-pw`

```
    mysql> use wsourcedb;
    mysql> show tables;
    mysql> describe [table name];
    mysql> select * from [table name];
```

## DB Schema

TODO: update schema
