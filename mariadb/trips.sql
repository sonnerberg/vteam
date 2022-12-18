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
    UPDATE trips SET cost = TIMESTAMPDIFF(SECOND, @starttime, @endtime) WHERE username = a_username ORDER BY id DESC LIMIT 1;

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
