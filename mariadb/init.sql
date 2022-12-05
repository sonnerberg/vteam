DROP TABLE IF EXISTS `customer`;
DROP TABLE IF EXISTS `scooter`;
DROP TABLE IF EXISTS `zones`;
DROP TABLE IF EXISTS `geojson`;

CREATE TABLE IF NOT EXISTS `customer` (
`id` INT AUTO_INCREMENT,
`surname` VARCHAR(50),
`lastname` VARCHAR(50),
`adress` VARCHAR(50),
`billing_adress` VARCHAR(50),
`username` VARCHAR(50) NOT NULL UNIQUE,
`password` VARCHAR(250),
`email` VARCHAR(50),
`balance` INT,
`status` VARCHAR(50),
PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

CREATE TABLE IF NOT EXISTS `scooter` (
`id` INT AUTO_INCREMENT,
`position` POINT,
`status` VARCHAR(50),
`health` VARCHAR(50),
`rented` BOOLEAN,
`speed` INT,
PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

CREATE TABLE IF NOT EXISTS `zones` (
`id` INT AUTO_INCREMENT,
`position` POLYGON,
`type` VARCHAR(50),
`speed_limit` INT,
PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

CREATE TABLE IF NOT EXISTS `geojson` (
`id` INT AUTO_INCREMENT,
`position` JSON,
`type` VARCHAR(50),
`speed_limit` INT,
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

--
-- Insert some scooters.
--
LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/init_data/scooters.csv'
INTO TABLE scooter
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(@col1, @col2, @col3, @col4, @col5)
SET
`position` = PointFromText(@col1),
`status` = @col2,
`health` = @col3,
`rented` = @col4,
`speed` = @col5
;

--
-- Insert some zones.
--
LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/init_data/zones.csv'
INTO TABLE zones
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(@col1, @col2, @col3)
SET
`position` = PolygonFromText(@col1),
`type` = @col2,
`speed_limit` = @col3
;

--
-- Insert some geodata.
--
INSERT INTO geojson (position, type, speed_limit) VALUES
    ('{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[59.374,16.5025],[59.3731,16.5051],[59.3722,16.5038],[59.3727,16.5008],[59.374,16.5025]]]},"properties":{"prop0":"value0","prop1":{"this":"that"}}}', "limited speed", 15);
