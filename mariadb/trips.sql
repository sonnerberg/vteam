--
-- Insert some trips.
--
LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/init_data/trips.csv'
INTO TABLE trips
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(@startposition,@endposition,@starttime,@endtime,@username,@cost)
SET
`startposition` = PointFromText(@startposition),
`endposition` = PointFromText(@endposition),
`starttime` = @starttime,
`endtime` = @endtime,
`username` = @username,
`cost` = @cost
;

-- Procedure get_all_trips()

DROP PROCEDURE IF EXISTS get_all_trips;

DELIMITER ;;

CREATE PROCEDURE get_all_trips()
 BEGIN

    SELECT * from trips;

  END
;;

DELIMITER ;

-- Procedure get_all_trips_by_username()

DROP PROCEDURE IF EXISTS get_all_trips_by_username;

DELIMITER ;;

CREATE PROCEDURE get_all_trips_by_username(
                    `a_username` VARCHAR(50)
)
 BEGIN

   SELECT *
     FROM trips
    WHERE username = a_username;


  END
;;

DELIMITER ;

-- Procedure calculate_trip_cost()

DROP PROCEDURE IF EXISTS calculate_trip_cost;

DELIMITER ;;

CREATE PROCEDURE calculate_trip_cost(
    `a_username` VARCHAR(50)
)
 BEGIN
    SELECT starttime, endtime INTO @starttime, @endtime FROM trips WHERE username = a_username ORDER BY id DESC LIMIT 1;
    UPDATE trips SET cost = TIMESTAMPDIFF(SECOND, @starttime, @endtime) + 100 WHERE username = a_username ORDER BY id DESC LIMIT 1;

  END
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
       SET endposition = NEW.geometry, endtime = CURRENT_TIMESTAMP WHERE OLD.username = trips.username ORDER BY id DESC LIMIT 1;
    CALL calculate_trip_cost(OLD.username);
 END IF;
END;
;;

DELIMITER ;

-- Procedure get_startposition_and_endposition_of_last_trip()

DROP PROCEDURE IF EXISTS get_startposition_and_endposition_of_last_trip;

DELIMITER ;;

CREATE PROCEDURE get_startposition_and_endposition_of_last_trip(
          `a_username` VARCHAR(50)
)
 BEGIN

    SELECT startposition,endposition FROM trips WHERE username = `a_username` ORDER BY id DESC LIMIT 1;

  END
;;

DELIMITER ;

-- Procedure check_if_free_parking_to_parking()

DROP PROCEDURE IF EXISTS check_if_free_parking_to_parking;

DELIMITER ;;

CREATE PROCEDURE check_if_free_parking_to_parking(
    `a_list_of_coordinates` VARCHAR(5000),
    `startposition` VARCHAR(100),
    `endposition` VARCHAR(100)
)
 BEGIN

     SELECT ST_Contains(ST_GeomFromText(CONCAT('MULTIPOLYGON((', a_list_of_coordinates, '))')), ST_GeomFromText(CONCAT('POINT(', startposition, ')'))) INTO @scooter_taken_from_within_parking;
     IF @scooter_taken_from_within_parking=false
      THEN
      SELECT ST_Contains(ST_GeomFromText(CONCAT('MULTIPOLYGON((', a_list_of_coordinates, '))')), ST_GeomFromText(CONCAT('POINT(', endposition, ')'))) AS 'give_discount';
    ELSE
      SELECT false;
    END IF;

  END
;;

DELIMITER ;

-- Procedure give_discount()

DROP PROCEDURE IF EXISTS give_discount;

DELIMITER ;;

CREATE PROCEDURE give_discount(
                    `a_username` VARCHAR(50)
)
 BEGIN

    UPDATE trips SET discount = 50 WHERE username = `a_username` ORDER BY id DESC LIMIT 1;

  END
;;

DELIMITER ;
