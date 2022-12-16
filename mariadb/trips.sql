DROP TABLE IF EXISTS `trips`;

CREATE TABLE IF NOT EXISTS `trips` (
`id` INT AUTO_INCREMENT,
`startposition` POINT,
`endposition` POINT,
`starttime` DATETIME,
`endtime` DATETIME,
`user_id` INTEGER,
`cost` FLOAT,
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
(@startposition,@endposition,@starttime,@endtime,@user_id,@cost)
SET
`startposition` = PointFromText(@startposition),
`endposition` = PointFromText(@endposition),
`starttime` = @starttime,
`endtime` = @endtime,
`user_id` = @user_id,
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

-- Procedure get_all_trips_by_user_id()

DROP PROCEDURE IF EXISTS get_all_trips_by_user_id;

DELIMITER ;;

CREATE PROCEDURE get_all_trips_by_user_id(
                    `a_user_id` INTEGER
)
 BEGIN

   SELECT *
     FROM trips
    WHERE user_id = a_user_id;


  END
;;

DELIMITER ;
