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
