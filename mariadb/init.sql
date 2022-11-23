DROP TABLE IF EXISTS `customer`;

CREATE TABLE IF NOT EXISTS `customer` (
`id` INT AUTO_INCREMENT,
`first_name` VARCHAR(50),
`last_name` VARCHAR(50),
`adress` VARCHAR(50),
`zip` INT,
`location` VARCHAR(50),
`email` VARCHAR(50),
PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

--
-- Insert some customers.
--
LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/init_data/customer.csv'
INTO TABLE customer
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(first_name, last_name, adress, zip, location, email)
;
