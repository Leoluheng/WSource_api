CREATE DATABASE IF NOT EXISTS wsourcedb; -- redundant if using docker-compose
USE wsourcedb;

CREATE TABLE IF NOT EXISTS `aeskey` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `secret` varchar(255),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `name` varchar(30) NOT NULL,
  `authority` varchar(30) NOT NULL,
  `email` varchar(80) NOT NULL,
  `token` varchar(255),
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
  `type` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT IGNORE INTO `category` (id, type) 
VALUES (1, 'academic'), (2,'life'), (3,'campus'), (4, 'current_student'), (5, 'incoming_student'), (6, 'alumni');

CREATE TABLE IF NOT EXISTS `resource_category` (
  `resource_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`resource_id`),
  CONSTRAINT fk_resource_tag_id FOREIGN KEY (`resource_id`) REFERENCES resources(`id`)
);