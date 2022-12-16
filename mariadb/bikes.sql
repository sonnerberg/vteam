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

-- Procedure update_scooter_charging()

DROP PROCEDURE IF EXISTS update_scooter_charging;

DELIMITER ;;

CREATE PROCEDURE update_scooter_charging(
                    `a_boolean` BOOLEAN,
                    `a_scooter_id` INTEGER
)
 BEGIN

    UPDATE bikes
    SET charging = a_boolean
    WHERE id = a_scooter_id;


  END
;;

DELIMITER ;

-- Procedure update_scooter_blocked()

DROP PROCEDURE IF EXISTS update_scooter_blocked;

DELIMITER ;;

CREATE PROCEDURE update_scooter_blocked(
                    `a_boolean` BOOLEAN,
                    `a_scooter_id` INTEGER
)
 BEGIN

    UPDATE bikes
    SET blocked = a_boolean
    WHERE id = a_scooter_id;


  END
;;

DELIMITER ;

-- Procedure update_scooter_battery_warning()

DROP PROCEDURE IF EXISTS update_scooter_battery_warning;

DELIMITER ;;

CREATE PROCEDURE update_scooter_battery_warning(
                    `a_boolean` BOOLEAN,
                    `a_scooter_id` INTEGER
)
 BEGIN

    UPDATE bikes
    SET battery_warning = a_boolean
    WHERE id = a_scooter_id;


  END
;;

DELIMITER ;

-- Procedure update_scooter_battery_depleted()

DROP PROCEDURE IF EXISTS update_scooter_battery_depleted;

DELIMITER ;;

CREATE PROCEDURE update_scooter_battery_depleted(
                    `a_boolean` BOOLEAN,
                    `a_scooter_id` INTEGER
)
 BEGIN

    UPDATE bikes
    SET battery_depleted = a_boolean
    WHERE id = a_scooter_id;


  END
;;

DELIMITER ;

-- Procedure update_scooter_rented()

DROP PROCEDURE IF EXISTS update_scooter_rented;

DELIMITER ;;

CREATE PROCEDURE update_scooter_rented(
                    `a_boolean` BOOLEAN,
                    `a_scooter_id` INTEGER
)
 BEGIN

    UPDATE bikes
    SET rented = a_boolean
    WHERE id = a_scooter_id;


  END
;;

DELIMITER ;

-- Procedure update_scooter_user_id()

DROP PROCEDURE IF EXISTS update_scooter_user_id;

DELIMITER ;;

CREATE PROCEDURE update_scooter_user_id(
                    `a_user_id` INTEGER,
                    `a_scooter_id` INTEGER
)
 BEGIN

    UPDATE bikes
    SET user_id = a_user_id
    WHERE id = a_scooter_id;


  END
;;

DELIMITER ;

-- Procedure update_scooter_whole()

DROP PROCEDURE IF EXISTS update_scooter_whole;

DELIMITER ;;

CREATE PROCEDURE update_scooter_whole(
                    `a_boolean` BOOLEAN,
                    `a_scooter_id` INTEGER
)
 BEGIN

    UPDATE bikes
    SET whole = a_boolean
    WHERE id = a_scooter_id;


  END
;;

DELIMITER ;

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

    SELECT LAST_INSERT_ID() AS id;


  END
;;

DELIMITER ;

-- Procedure get_scooters_within()

DROP PROCEDURE IF EXISTS get_scooters_within;

DELIMITER ;;

CREATE PROCEDURE get_scooters_within(
    `a_geometry_object` VARCHAR(1024)
)

 BEGIN

    SELECT * FROM bikes WHERE ST_CONTAINS(ST_GeomFromGeoJson(a_geometry_object), geometry);

  END
;;

DELIMITER ;

-- Procedure get_scooter_by_id()

DROP PROCEDURE IF EXISTS get_scooter_by_id;

DELIMITER ;;

CREATE PROCEDURE get_scooter_by_id(
    `a_scooter_id` INTEGER
)

 BEGIN

    SELECT * FROM bikes WHERE id = a_scooter_id;

  END
;;

DELIMITER ;

-- Procedure set_scooter_returned()

DROP PROCEDURE IF EXISTS set_scooter_returned;

DELIMITER ;;

CREATE PROCEDURE set_scooter_returned(
    `a_username` VARCHAR(50),
    `a_scooter_id` INTEGER
    )

 BEGIN

    DELETE FROM customer2bike WHERE customer_username = `a_username` AND bike_id = `a_scooter_id`;

  END
;;

DELIMITER ;
-- Procedure set_scooter_rented()

DROP PROCEDURE IF EXISTS set_scooter_rented;

DELIMITER ;;

CREATE PROCEDURE set_scooter_rented(
    `a_username` VARCHAR(50),
    `a_scooter_id` INTEGER
    )

 BEGIN

    INSERT INTO customer2bike SET customer_username = `a_username`, bike_id = `a_scooter_id`;

  END
;;

DELIMITER ;

-- Procedure get_all_scooters()

DROP PROCEDURE IF EXISTS get_all_scooters;

DELIMITER ;;

CREATE PROCEDURE get_all_scooters()

 BEGIN

    SELECT * FROM bikes;

  END
;;

DELIMITER ;

DROP TRIGGER IF EXISTS set_returned;

DELIMITER ;;
CREATE TRIGGER set_returned
AFTER DELETE ON customer2bike
FOR EACH ROW
BEGIN
    UPDATE bikes SET rented = false, username = null WHERE id = OLD.bike_id;
END;
;;

DELIMITER ;
DROP TRIGGER IF EXISTS set_rented;

DELIMITER ;;
CREATE TRIGGER set_rented
AFTER INSERT ON customer2bike
FOR EACH ROW
BEGIN
    UPDATE bikes SET rented = true, username = NEW.customer_username WHERE id = NEW.bike_id;
END;
;;

DELIMITER ;
DROP TRIGGER IF EXISTS insert_trip;

DELIMITER ;;
CREATE TRIGGER insert_trip
AFTER UPDATE ON bikes
FOR EACH ROW
BEGIN
 IF OLD.rented = false AND NEW.rented = true AND NEW.username IS NOT NULL THEN
    INSERT INTO trips (startposition,starttime,username)
    VALUES (NEW.geometry, CURRENT_TIMESTAMP, NEW.username);
 END IF;
 IF OLD.rented = true AND NEW.rented = false AND NEW.username IS NULL THEN
    UPDATE trips
       SET endposition = NEW.geometry, endtime = CURRENT_TIMESTAMP, cost = 999 WHERE OLD.username = trips.username ORDER BY id DESC LIMIT 1;
 END IF;
END;
;;

DELIMITER ;
