CREATE DATABASE IF NOT EXISTS bankdb;
use bankdb;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    lastName  varchar(255) NOT NULL,
    email     varchar(255) NOT NULL,
    password  varchar(255) NOT NULL,
    PRIMARY KEY (id)
) AUTO_INCREMENT = 1;
