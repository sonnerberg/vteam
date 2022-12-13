DROP TABLE IF EXISTS `bikes`;

CREATE TABLE IF NOT EXISTS `bikes` (
`id` INT AUTO_INCREMENT,
`geometry` POINT,
`whole` BOOLEAN DEFAULT 1,
`charging` BOOLEAN DEFAULT 0,
`blocked` BOOLEAN DEFAULT 0,
`battery_warning` BOOLEAN DEFAULT 0,
`battery_depleted` BOOLEAN DEFAULT 0,
`rented` BOOLEAN DEFAULT 0,
`user_id` INT,
PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

--
-- Insert some scooters.
--
LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/init_data/bikes.csv'
INTO TABLE bikes
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(@col1)
SET
`geometry` = PointFromText(@col1)
;

-- Procedure update_scooter_position()

DROP PROCEDURE IF EXISTS update_scooter_position;

DELIMITER ;;

CREATE PROCEDURE update_scooter_position(
                    `scooter_id` INT,
                    `latitude` FLOAT,
                    `longitude` FLOAT
)
 BEGIN
 SET @coords = CONCAT('POINT(', latitude, ' ', longitude, ')');

    UPDATE bikes
    SET geometry = ST_PointFromText(@coords)
    WHERE id = scooter_id;


  END
;;

DELIMITER ;

-- Procedure new_scooter()

DROP PROCEDURE IF EXISTS new_scooter;

DELIMITER ;;

CREATE PROCEDURE new_scooter(
                    `latitude` FLOAT,
                    `longitude` FLOAT
)
 BEGIN
 SET @coords = CONCAT('POINT(', latitude, ' ', longitude, ')');

    INSERT INTO bikes (geometry)
    VALUES (PointFromText(@coords));


  END
;;

DELIMITER ;
