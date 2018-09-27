<?php

require('DbConfig.php');
require('CustomerDao.php');

$_POST = json_decode(file_get_contents('php://input'), true);

$dbconfig = new DbConfig('config.ini');

$dao = new CustomerDao($dbconfig);

$resultJson = '';

if($_POST['id']==null){
    $resultJson = $dao->save_customer($_POST);
}else{
    $resultJson = $dao->update_customer($_POST);
}

echo $resultJson;

?>
