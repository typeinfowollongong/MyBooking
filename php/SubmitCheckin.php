<?php

require('DbConfig.php');
require('CheckinDao.php');
require('MyLogger.php');

$_POST = json_decode(file_get_contents('php://input'), true);


$dbconfig = new DbConfig('config.ini');

$dao = new CheckinDao($dbconfig);

$resultJson = '';

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
    if($_POST['action']=='checkout'){
        $resultJson = $dao->checkout($_POST['data']);
    } 
    if($_POST['action']=='search'){
        //MyLogger::log("### LOGGING search criteria: ".json_encode($_POST['criteria']), MyLogger::$ERROR, "mybooking.log");
        $resultJson = $dao->search($_POST['criteria']);
        //MyLogger::log("### LOGGING search results: ".$resultJson, MyLogger::$ERROR, "mybooking.log");
    } 
}

echo $resultJson 

//echo json_encode($_POST);

?>
