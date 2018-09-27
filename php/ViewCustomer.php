<?php

require('DbConfig.php');
require('CustomerDao.php');

$_POST = json_decode(file_get_contents('php://input'), true);

$dbconfig = new DbConfig('config.ini');

$dao = new CustomerDao($dbconfig);

$resultJson = "";

if($_POST!=null && $_POST["search_criteria"] != null) {
    $criteria = $_POST["search_criteria"];
    $resultJson = $dao->search_customers($criteria);
    
}else{
    $resultJson = $dao->get_all_customers();
}

echo $resultJson;

?>
