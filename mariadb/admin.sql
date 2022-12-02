DROP TABLE IF EXISTS `admin`;

CREATE TABLE IF NOT EXISTS `admin` (
`password` VARCHAR(255),
`email` VARCHAR(50),
PRIMARY KEY (`email`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

--
-- Insert an admin
--
LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/init_data/admins.csv'
INTO TABLE admin
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(email, password)
;

-- Procedure get_filtered_admin()

DROP PROCEDURE IF EXISTS get_filtered_admin;

DELIMITER ;;

CREATE PROCEDURE get_filtered_admin(
                    `filter` VARCHAR(20)
)
 BEGIN

    SELECT email
        AS 'Email'
      FROM admin
     WHERE admin.email = filter;


  END
;;

DELIMITER ;
