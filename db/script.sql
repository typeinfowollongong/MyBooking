SP_WHO
=======================
SHOW FULL PROCESSLIST

use mybooking;

-- booking status
INSERT INTO `my_booking_status`(`id`, `code`, `name`) VALUES ('1','A','Reserved');
INSERT INTO `my_booking_status`(`id`, `code`, `name`) VALUES ('2','B','Occupied');
INSERT INTO `my_booking_status`(`id`, `code`, `name`) VALUES ('3','C','Housekeeping');
INSERT INTO `my_booking_status`(`id`, `code`, `name`) VALUES ('4','D','Open');
-- booking type
INSERT INTO `my_booking_type`(`id`, `code`, `name`) VALUES ('1','A','External');
INSERT INTO `my_booking_type`(`id`, `code`, `name`) VALUES ('2','B','Temple');
INSERT INTO `my_booking_type`(`id`, `code`, `name`) VALUES ('3','C','School ECE');
INSERT INTO `my_booking_type`(`id`, `code`, `name`) VALUES ('4','D','NTI');
INSERT INTO `my_booking_type`(`id`, `code`, `name`) VALUES ('5','E','Meditation retreate');
-- booking colour setting
INSERT INTO `my_booking_colour`(`id`, `status_id`, `type_id`, `name`) VALUES ('1','1','1','yellow');
INSERT INTO `my_booking_colour`(`id`, `status_id`, `type_id`, `name`) VALUES ('2','2','1','blue');
INSERT INTO `my_booking_colour`(`id`, `status_id`, `type_id`, `name`) VALUES ('3','3','1','brown');
INSERT INTO `my_booking_colour`(`id`, `status_id`, `type_id`, `name`) VALUES ('4','4','1','white');
INSERT INTO `my_booking_colour`(`id`, `status_id`, `type_id`, `name`) VALUES ('5','1','2','purple');
INSERT INTO `my_booking_colour`(`id`, `status_id`, `type_id`, `name`) VALUES ('6','1','3','');
INSERT INTO `my_booking_colour`(`id`, `status_id`, `type_id`, `name`) VALUES ('7','1','4','');
INSERT INTO `my_booking_colour`(`id`, `status_id`, `type_id`, `name`) VALUES ('8','1','5','');
-- room setting
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('1','101','2S',0,180);
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('2','102','4S',0,230);
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('3','201','2S',1,190);
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('4','202','4S',1,250);
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('5','301','2S',0,180);
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('6','302','4S',0,230);
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('7','401','2S',1,190);
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('8','402','4S',1,250);
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('9','103','2S',0,180);
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('10','104','4S',0,230);
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('11','203','2S',1,190);
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('12','204','4S',1,250);
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('13','303','2S',0,180);
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('14','304','4S',0,230);
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('15','403','2S',1,190);
INSERT INTO `my_room_details`(`id`, `room_number`, `room_type`, `TV`, price) VALUES ('16','404','4S',1,250);



-- customer
INSERT INTO `my_customer`(`id`, `first_name`, `last_name`, `contact_number`, `email`, `credit_card_number`, `credit_card_expiry_date`, `credit_card_csv`, `car_rego`, `address`, `branch`, `redeem`) 
VALUES ('x0001','Malcolm','Turnbull','0001001001','abc@test.com','123456789000','01/01/2020','012','ABCD99','1 XXX street','Sydney','test1');
INSERT INTO `my_customer`(`id`, `first_name`, `last_name`, `contact_number`, `email`, `credit_card_number`, `credit_card_expiry_date`, `credit_card_csv`, `car_rego`, `address`, `branch`, `redeem`) 
VALUES ('x0002','Bill','Shorten','0001001001','abc@test.com','123456789000','01/01/2020','012','ABCD99','1 XXX street','Sydney','test1');
INSERT INTO `my_customer`(`id`, `first_name`, `last_name`, `contact_number`, `email`, `credit_card_number`, `credit_card_expiry_date`, `credit_card_csv`, `car_rego`, `address`, `branch`, `redeem`) 
VALUES ('x0003','Tony','Abbott','0001001001','abc@test.com','123456789000','01/01/2020','012','ABCD99','1 XXX street','Sydney','test1');
INSERT INTO `my_customer`(`id`, `first_name`, `last_name`, `contact_number`, `email`, `credit_card_number`, `credit_card_expiry_date`, `credit_card_csv`, `car_rego`, `address`, `branch`, `redeem`) 
VALUES ('x0004','Julia','Gillard','0001001001','abc@test.com','123456789000','01/01/2020','012','ABCD99','1 XXX street','Sydney','test1');
INSERT INTO `my_customer`(`id`, `first_name`, `last_name`, `contact_number`, `email`, `credit_card_number`, `credit_card_expiry_date`, `credit_card_csv`, `car_rego`, `address`, `branch`, `redeem`) 
VALUES ('x0005','Kevin','Rudd','0001001001','abc@test.com','123456789000','01/01/2020','012','ABCD99','1 XXX street','Sydney','test1');
INSERT INTO `my_customer`(`id`, `first_name`, `last_name`, `contact_number`, `email`, `credit_card_number`, `credit_card_expiry_date`, `credit_card_csv`, `car_rego`, `address`, `branch`, `redeem`) 
VALUES ('x0006','John','Howard','0001001001','abc@test.com','123456789000','01/01/2020','012','ABCD99','1 XXX street','Sydney','test1');

-- booking
INSERT INTO `booking`(`id`, `customer_id`, `booking_type`, `room_number`, `arrive_date`, `leave_date`, `meal_breakfast`, `meal_dinner`, `adults`, `children`, `status`) 
VALUES ('b0001','x0001','Guest','101',DATE_ADD(CURDATE(), interval(1) DAY), DATE_ADD(CURDATE(), interval(3) DAY),'2','2','1','1','A');
INSERT INTO `booking`(`id`, `customer_id`, `booking_type`, `room_number`, `arrive_date`, `leave_date`, `meal_breakfast`, `meal_dinner`, `adults`, `children`, `status`) 
VALUES ('b0002','x0002','Guest','102',DATE_ADD(CURDATE(), interval(3) DAY), DATE_ADD(CURDATE(), interval(5) DAY),'2','2','1','1','A');
INSERT INTO `booking`(`id`, `customer_id`, `booking_type`, `room_number`, `arrive_date`, `leave_date`, `meal_breakfast`, `meal_dinner`, `adults`, `children`, `status`) 
VALUES ('b0003','x0003','Guest','202',DATE_ADD(CURDATE(), interval(4) DAY), DATE_ADD(CURDATE(), interval(6) DAY),'2','2','1','1','A');

-- checkin




--VIEW 
CREATE VIEW view_booking AS 
SELECT b.`id`, b.`customer_id` as customerId, b.`booking_type_id`, b.`room_number` as roomNumber, b.`arrive_date` as dateOfArrive, b.`leave_date` as dateOfLeave, 
b.`price`, b.`meal_breakfast` as breakfast, b.`meal_dinner` as dinner, b.`adults` as numberOfAdults, b.`children` as numberOfChildren, b.`isConfirmed`, b.`branch`, 
b.`refeem`, b.`status`, c.`first_name` as firstName, c.`last_name` as lastName, c.`contact_number` as contactNumber, c.`email`, c.`car_rego` as carRego, c.`address`
FROM `booking` b,  `my_customer` c
WHERE b.customer_id = c.id and b.status = 'A'



 
 
 
 