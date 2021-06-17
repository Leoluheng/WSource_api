USE mysql;
ALTER USER 'root'@'%' IDENTIFIED BY 'my-secret-pw';
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'my-secret-pw';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS wsourcedb;
USE wsourcedb;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `access_level` int(5) NOT NULL,
  `email` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `resources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` longtext NOT NULL,
  `create_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(200) NOT NULL,
  `user_id` int(11),
  PRIMARY KEY (`id`),
  CONSTRAINT fk_resource_user_id FOREIGN KEY (`user_id`) REFERENCES users(`id`)
);

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `category` (type) 
SELECT DISTINCT type FROM (
  VALUES ('academic'), ('life'), ('campus'), ('current_student'), ('incoming_student'), ('alumni')
) AS new_category(type)
WHERE NOT EXISTS (SELECT 1 FROM `category` WHERE category.type = new_category.type)

CREATE TABLE IF NOT EXISTS `resource_category` (
  `resource_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`resource_id`),
  CONSTRAINT fk_resource_tag_id FOREIGN KEY (`resource_id`) REFERENCES resources(`id`)
);
