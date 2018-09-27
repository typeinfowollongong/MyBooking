<?php

require('DbConfig.php');
require('BookingDao.php');
require('MyLogger.php');

$_POST = json_decode(file_get_contents('php://input'), true);



$dbconfig = new DbConfig('config.ini');

$dao = new BookingDao($dbconfig);

$resultJson = '';

MyLogger::log("### start to logging...", MyLogger::$ERROR, "mybooking.log");

if($_POST!=null){
    if($_POST['action']=='insert'){
        $resultJson = $dao->save($_POST['data']);
    }
    if($_POST['action']=='update'){
        $resultJson = $dao->update($_POST['data']);
    }
    if($_POST['action']=='cancel'){
        $resultJson = $dao->cancel($_POST['id']);
    }
    
    /*
    if($_POST['id']==null){
        $resultJson = $dao->save($_POST);
    }else{
        $resultJson = $dao->update($_POST);
    }*/
}


echo $resultJson 

//echo json_encode($_POST);

?>
