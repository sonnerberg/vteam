DROP TABLE IF EXISTS `admin`;

CREATE TABLE IF NOT EXISTS `admin` (
`password` VARCHAR(255),
`email` VARCHAR(100),
`super` BOOLEAN,
PRIMARY KEY (`email`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

--
-- Insert admins
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
(email, password, super)
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

-- Procedure get_password_of_admin()

DROP PROCEDURE IF EXISTS get_password_of_admin;

DELIMITER ;;

CREATE PROCEDURE get_password_of_admin(
                    `filter` VARCHAR(100)
)
 BEGIN

    SELECT password
        AS 'password'
      FROM admin
     WHERE admin.email = filter;


  END
;;

DELIMITER ;

-- Procedure check_if_admin_is_super()

DROP PROCEDURE IF EXISTS check_if_admin_is_super;

DELIMITER ;;

CREATE PROCEDURE check_if_admin_is_super(
                    `filter` VARCHAR(100)
)
 BEGIN

    SELECT super
        AS 'super'
      FROM admin
     WHERE admin.email = filter;


  END
;;

DELIMITER ;
