USE challenge02db;

CREATE TABLE IF NOT EXISTS people (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);