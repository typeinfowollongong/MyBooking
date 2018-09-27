<?php

require('DbConfig.php');
require('BookingTypeDao.php');

$_POST = json_decode(file_get_contents('php://input'), true);

$dbconfig = new DbConfig('config.ini');

$resultJson = '';
if($_POST["reference_data"]=="bookingType"){
    $dao = new BookingTypeDao($dbconfig);
    $resultJson = $dao->get_all();
}

echo $resultJson;

?>
