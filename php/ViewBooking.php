<?php

require('DbConfig.php');
require('BookingDao.php');

$_POST = json_decode(file_get_contents('php://input'), true);

$dbconfig = new DbConfig('config.ini');

$dao = new BookingDao($dbconfig);

$resultJson = '';

if($_POST!=null && $_POST["search_criteria"] != null) {
    $criteria = $_POST["search_criteria"];
    $resultJson = $dao->search($criteria);
    
}else{
    $resultJson = $dao->get_all();
}

echo $resultJson;

?>
