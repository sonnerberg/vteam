DROP TABLE IF EXISTS `trips`;

CREATE TABLE IF NOT EXISTS `trips` (
`id` INT AUTO_INCREMENT,
`startposition` POINT,
`endposition` POINT,
`starttime` DATETIME,
`endtime` DATETIME,
`username` VARCHAR(50),
`cost` FLOAT,
FOREIGN KEY(`username`) REFERENCES `customer`(`username`),
PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

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
