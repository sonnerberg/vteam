-- Procedure get_all_customers()

DROP PROCEDURE IF EXISTS get_all_customers;

DELIMITER ;;

CREATE PROCEDURE get_all_customers()
 BEGIN

    SELECT surname,lastname,adress,billing_adress,username,email,balance,status
    FROM customer;

  END
;;

DELIMITER ;

-- Procedure get_customer_by_username()

DROP PROCEDURE IF EXISTS get_customer_by_username;

DELIMITER ;;

CREATE PROCEDURE get_customer_by_username(
                    `a_username` VARCHAR(50)
)
 BEGIN

   SELECT surname,lastname,adress,billing_adress,username,email,balance,status
     FROM customer
    WHERE username = a_username;


  END
;;

DELIMITER ;

-- Procedure update_customer_info()

DROP PROCEDURE IF EXISTS update_customer_info;

DELIMITER ;;

CREATE PROCEDURE update_customer_info(
                    `a_username` VARCHAR(50),
                    `a_surname` VARCHAR(50),
                    `a_lastname` VARCHAR(50),
                    `a_adress` VARCHAR(50),
                    `a_billing_adress` VARCHAR(50),
                    `a_email` VARCHAR(50)
)
 BEGIN

   UPDATE customer
   SET
      surname = a_surname,
      lastname = a_lastname,
      adress = a_adress,
      billing_adress = a_billing_adress,
      email = a_email
    WHERE username = a_username;


  END
;;

DELIMITER ;
