<?php

class BookingTypeDao {
    
    private $mysqli;

    function __construct($dbconfig) {
        $this->mysqli = $dbconfig->mysqli;
    }
    
    public function get_all() {    
        $sql = "SELECT `id`, `code` as bookingTypeCode, `name` as bookingTypeName FROM `my_booking_type` WHERE 1";
        return json_encode($this->executeWithResults($sql));
    }
    /**
     * To implement save new customer funtion
     * use statement Prepare
     * @param  $obj
     * @return string
     */
    public function save($obj) {
    }
    
    /**
     * To implement save funtion
     * use statement Prepare
     * @param  $obj
     * @return string
     */
    public function update($obj) {
    }
    
    
    private function executeWithSingleResult($sql){
        $resultArray = array();
        if($result = $this->mysqli->query($sql)) {
            $row = $result->fetch_object();
            $resultArray = $row;
            return $resultArray;
        }else{
            die('Could not execute sql: ' . mysqli_error());
        }
    }
    
    private function executeWithResults($sql){
        $resultArray = array();
        if($result = $this->mysqli->query($sql)) {
            while ($row = $result->fetch_object()) {
                $resultArray[] = $row;
            }
            return $resultArray;
        }else{
            die('Could not execute sql: ' . mysqli_error());
        }
    }
       
    private function execute($sql) {
        if($this->mysqli->query($sql)) {
            echo "";
        }else{
          die('Could not execute sql: ' . mysqli_error());
        }
    }
    
}
?>
