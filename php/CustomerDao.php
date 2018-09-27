<?php

class CustomerDao {
    
    private $mysqli;

    function __construct($dbconfig) {
        $this->mysqli = $dbconfig->mysqli;
    }
    
    public function get_all_customers() {    
        $sql = "SELECT `id`, `first_name` as firstName, `last_name` as lastName, `contact_number` as contactNumber, `email` as email, `credit_card_number` as creditCardNumber,". 
                "`credit_card_expiry_date` as creditCardExpiryDate, `credit_card_csv` as creditCardCSV, `car_rego` as carRego, `address` as address ".
                "FROM `my_customer` WHERE 1";
        return json_encode($this->executeWithResults($sql));
    }
    
    public function search_customers($criteria) {
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
        
        $sql = "SELECT `id`, `first_name` as firstName, `last_name` as lastName, `contact_number` as contactNumber, `email` as email, `credit_card_number` as creditCardNumber,".
            "`credit_card_expiry_date` as creditCardExpiryDate, `credit_card_csv` as creditCardCSV, `car_rego` as carRego, `address` as address ".
            "FROM `my_customer` ".$where;
        return json_encode($this->executeWithResults($sql));
    }
    
    /**
     * To implement save new customer funtion
     * use statement Prepare
     * @param  $obj
     * @return string
     */
    public function save_customer($obj) {
        $firstName = $obj['firstName'];
        $lastName =  $obj['lastName'];
        $contactNumber = $obj['contactNumber'];
        $email = $obj['email'];
        $creditCardNumber = $obj['creditCardNumber'];
        $creditCardExpiryDate = $obj['creditCardExpiryDate'];
        $creditCardCSV = $obj['creditCardCSV'];
        $carRego = $obj['carRego'];
        $address = $obj['address'];
        
        $resultArray = $this->executeWithSingleResult("SELECT UUID() as id");
        $id = $resultArray->id;
        
        $sql = "INSERT INTO `my_customer`".
                "(`id`, `first_name`, `last_name`, `contact_number`, `email`, `credit_card_number`, `credit_card_expiry_date`, `credit_card_csv`, `car_rego`, `address`)". 
                "VALUES ('".$id."','".
                    $firstName."','".
                    $lastName."','".
                    $contactNumber."','".
                    $email."','".
                    $creditCardNumber."','".
                    $creditCardExpiryDate."','".
                    $creditCardCSV."','".
                    $carRego."','".
                    $address."')";
         $this->execute($sql);
         return $id;
    }
    
    /**
     * To implement save new customer funtion
     * use statement Prepare
     * @param  $obj
     * @return string
     */
    public function update_customer($obj) {
        $id = $obj['id'];
        $firstName = $obj['firstName'];
        $lastName =  $obj['lastName'];
        $contactNumber = $obj['contactNumber'];
        $email = $obj['email'];
        $creditCardNumber = $obj['creditCardNumber'];
        $creditCardExpiryDate = $obj['creditCardExpiryDate'];
        $creditCardCSV = $obj['creditCardCSV'];
        $carRego = $obj['carRego'];
        $address = $obj['address'];

        $sql = "UPDATE `my_customer` SET ".            
            "`first_name`='".$firstName."',".
            "`last_name`='".$lastName."',".
            "`contact_number`='".$contactNumber."',".
            "`email`='".$email."',".
            "`credit_card_number`='".$creditCardNumber."',".
            "`credit_card_expiry_date`='".$creditCardExpiryDate."',".
            "`credit_card_csv`='".$creditCardCSV."',".
            "`car_rego`='".$carRego."',".
            "`address`='".$address."' ".
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
