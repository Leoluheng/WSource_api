# Database Documentation

```
version: MySQL latest
```

## Set Up

Install Docker and then run `docker compose up`.

The command will build a container with customized mysql8.0 image from the dockerfile, which is initialized with a database as shown in the sql file on port 3306.

### Access DB in Docker Container

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
