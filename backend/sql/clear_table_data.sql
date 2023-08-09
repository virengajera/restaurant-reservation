
-- SQL Command For Deleting all data inside tables
SET SQL_SAFE_UPDATES = 0;
DELETE FROM admin;
DELETE FROM message;
DELETE FROM room;
DELETE FROM waiter;
DELETE FROM reservation;
DELETE FROM restaurant;
DELETE FROM customer;
DELETE FROM restaurantowner;

-- SQL Commands for reseting counter value to 1
SET SQL_SAFE_UPDATES = 0;
ALTER TABLE admin AUTO_INCREMENT = 1;
ALTER TABLE customer AUTO_INCREMENT = 1;
ALTER TABLE message AUTO_INCREMENT = 1;
ALTER TABLE reservation AUTO_INCREMENT = 1;
ALTER TABLE reservation AUTO_INCREMENT = 1;
ALTER TABLE restaurant AUTO_INCREMENT = 1;
ALTER TABLE restaurantowner AUTO_INCREMENT = 1;
ALTER TABLE room AUTO_INCREMENT = 1;
ALTER TABLE waiter AUTO_INCREMENT = 1;