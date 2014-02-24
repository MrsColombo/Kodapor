

DROP DATABASE IF EXISTS coderspool;

CREATE DATABASE coderspool;

USE coderspool;

CREATE TABLE accounts (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(32),
  password      VARCHAR(32)
);

CREATE TABLE appliers (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  account_id    INT,
  firstname     VARCHAR(32),
  lastname      VARCHAR(32),
  email         VARCHAR(100),
  phone         VARCHAR(64),
  FOREIGN KEY (account_id) REFERENCES accounts(id)
);

CREATE TABLE employers (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  account_id    INT,
  company       VARCHAR(64),
  contact       VARCHAR(64),
  email         VARCHAR(100),
  phone         VARCHAR(64),
  FOREIGN KEY (account_id) REFERENCES accounts(id)
);

CREATE TABLE categories (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(32)
);

CREATE TABLE competences (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(32),
  category      INT,
  FOREIGN KEY (category) REFERENCES categories(id)
);

CREATE TABLE appliances (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  applier_id    INT,
  competence_id INT,
  category_id   INT,
  experience    INT,
  FOREIGN KEY (applier_id) REFERENCES appliers(id),
  FOREIGN KEY (competence_id) REFERENCES competences(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE scoutings (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  job_id        INT,
  company_id    INT,
  competence_id INT,
  category_id   INT,
  experience    INT,
  FOREIGN KEY (company_id) REFERENCES employers(id),
  FOREIGN KEY (competence_id) REFERENCES competences(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

