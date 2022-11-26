DROP TABLE IF EXISTS `customer`;

CREATE TABLE IF NOT EXISTS `customer` (
`id` INT AUTO_INCREMENT,
`surname` VARCHAR(50),
`lastname` VARCHAR(50),
`adress` VARCHAR(50),
`billing_adress` VARCHAR(50),
`username` VARCHAR(50),
`password` VARCHAR(50),
`email` VARCHAR(50),
`balance` INT,
`status` VARCHAR(50),
PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

--
-- Insert some customers.
--
LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/init_data/users.csv'
INTO TABLE customer
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(surname, lastname, adress, billing_adress, username, password, email, balance, status)
;
