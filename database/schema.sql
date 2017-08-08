CREATE DATABASE content;

USE content;

CREATE TABLE post (
  id int NOT NULL,
  user_id int NOT NULL,
  trail_id int NOT NULL
);

CREATE TABLE user (
  id int NOT NULL,
);

CREATE TABLE trail (
  id int NOT NULL,
);