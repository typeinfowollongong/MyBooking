<?php

class BookingDao {
    
    private $mysqli;

    function __construct($dbconfig) {
        $this->mysqli = $dbconfig->mysqli;
    }
    
    public function get_all() {    
        $sql = "SELECT * FROM `view_booking";
        return json_encode($this->executeWithResults($sql));
    }
    /*
     * Search bookings
     */
    public function search($criteria) {
        //$array = json_decode($criteria,true);
        $where = "WHERE ";
        $counter = 0;
        foreach ($criteria as $key => $value) {
            if($counter > 0){
                $where = $where." AND ";
            }
            $where = $where.$key." = '".$value."' ";
            $counter = $counter + 1;
        }
        
        $sql = "SELECT * FROM `view_booking` ".$where;
        return json_encode($this->executeWithResults($sql));
    }
    
    /**
     * To implement save new booking funtion
     * use statement Prepare
     * @param  $obj
     * @return string
     */
    public function save($obj) {
        $customerId = $obj['customer']['id'];
        $bookingTypeId = $obj['bookingType']['id'];
        $roomNumber =  $obj['roomNumber'];
        $dateOfArrive = $obj['dateOfArrive'];
        $dateOfLeave = $obj['dateOfLeave'];
        $price = $obj['price'];
        $breakfast = $obj['breakfast'] ? 'true' : 'false';
        $dinner = $obj['dinner'] ? 'true' : 'false';
        $numberOfAdults = $obj['numberOfAdults'];
        $numberOfChildren = $obj['numberOfChildren'];
        $confirmed = $obj['isConfirmed'] ? 'true' : 'false';
        $branch = $obj['branch'];
        $refeem = $obj['refeem'];
        $status = 'A';
        $creditCardNumber = $obj['creditCardNumber'];
        $creditCardExpiryDate = $obj['creditCardExpiryDate'];
        $creditCardCVV = $obj['creditCardCVV'];
        $carRego = $obj['carRego'];
        
        $resultArray = $this->executeWithSingleResult("SELECT UUID() as id");
        $id = $resultArray->id;
        
        $sql = "INSERT INTO `booking`(`id`, `customer_id`, `booking_type_id`, `room_number`, `arrive_date`, `leave_date`, `price`, `meal_breakfast`, `meal_dinner`, `adults`, `children`, `isConfirmed`, `branch`, `refeem`, `status`, `credit_card_number`, `credit_card_expiry_date`, `credit_card_cvv`, `car_rego`)". 
                " VALUES ('".$id."','".
                    $customerId."','".
                    $bookingTypeId."','".
                    $roomNumber."',STR_TO_DATE('".
                    $dateOfArrive."','%d/%m/%Y') , STR_TO_DATE('".
                    $dateOfLeave."','%d/%m/%Y'), ".
                    $price.",".
                    $breakfast.",".
                    $dinner.",".
                    $numberOfAdults.",".
                    $numberOfChildren.",".
                    $confirmed.",'".
                    $branch."','".
                    $refeem."','".
                    $status."','".
                    $creditCardNumber."','".
                    $creditCardExpiryDate."','".
                    $creditCardCVV."','".
                    $carRego."')".
        
                    MyLogger::log("### LOGGING: ".$sql, MyLogger::$ERROR, "mybooking.log");
                    
         $this->execute($sql);
         return $id;
         //return $sql;
    }
    
    /**
     * To implement save new booking funtion
     * use statement Prepare
     * @param  $obj
     * @return string
     */
    public function update($obj) {
        $id = $obj['id'];
        $bookingTypeId = $obj['bookingType']['id'];
        $roomNumber =  $obj['roomNumber'];
        $dateOfArrive = $obj['dateOfArrive'];
        $dateOfLeave = $obj['dateOfLeave'];
        $price = $obj['price'];
        $breakfast = $obj['breakfast'];
        $dinner= $obj['dinner'];
        $isConfirmed = $obj['isConfirmed'];
        $numberOfAdults = $obj['numberOfAdults'];
        $numberOfChildren = $obj['numberOfChildren'];
        $branch = $obj['branch'];
        $refeem = $obj['refeem'];
        $creditCardNumber = $obj['creditCardNumber'];
        $creditCardExpiryDate = $obj['creditCardExpiryDate'];
        $creditCardCVV = $obj['creditCardCVV'];
        $carRego = $obj['carRego'];
        
        $sql = "UPDATE `booking` SET ".
            "`booking_type_id`='".$bookingTypeId."',".
            "`room_number`='".$roomNumber."',".
            "`arrive_date`= STR_TO_DATE('".$dateOfArrive."','%d/%m/%Y'), ".
            "`leave_date`= STR_TO_DATE('".$dateOfLeave."','%d/%m/%Y'), ".
            "`price`=".$price.",".
            "`meal_breakfast`=".$breakfast.",".
            "`meal_dinner`=".$dinner.",".
            "`adults`=".$numberOfAdults.",".
            "`children`=".$numberOfChildren.",".
            "`isConfirmed`=".$isConfirmed.", ".
            "`branch`='".$branch."', ".
            "`refeem`='".$refeem."', ".  
            "`credit_card_number`='".$creditCardNumber."',".
            "`credit_card_expiry_date`='".$creditCardExpiryDate."',".
            "`credit_card_csv`='".$creditCardCSV."',".
            "`car_rego`='".$carRego."' ".
            "WHERE `id`='".$id."' ";
        $this->execute($sql);
        return $id;
    }
    
    
    /**
     * To implement save new booking funtion
     * use statement Prepare
     * @param  $obj
     * @return string
     */
    public function cancel($id) {
        $status = 'C';
        $sql = "UPDATE `booking` SET ".
            "`status`='".$status."' ".
            "WHERE `id`='".$id."' ";
        $this->execute($sql);
        return $id;
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
