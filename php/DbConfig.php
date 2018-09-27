<?php

class DbConfig {
    
    public $mysqli;
    
    public $dbhost;
    public $dbuser;
    public $dbpass;
    public $dbname;
    public $port;
    
    function __construct($ini_path) {
        //print_r('start connecting...');
        $ini_array      = parse_ini_file($ini_path, true);
        //print_r('array: '. json_encode($ini_array) );
        
        $this->dbhost   = $ini_array['database']['host'];
        $this->dbuser   = $ini_array['database']['username'];
        $this->dbpass   = $ini_array['database']['password'];
        $this->port     = $ini_array['database']['port'];
        $this->dbname   = $ini_array['database']['dbname'];
        /*
        print_r('HOST: '.$this->dbhost);
        print_r('USER: '.$this->dbuser);
        print_r('PASS: '.$this->dbpass);
        print_r('NAME: '.$this->dbname);
        */
        $this->connect();      
        
    }
    
    public function connect(){

        $this->mysqli = new mysqli($this->dbhost,$this->dbuser, $this->dbpass, $this->dbname);
        if ($this->mysqli->connect_errno) {
            //print_r($this->mysqli->connect_error);
        }
        //print_r('Connected successfully...');
    }
}
?>
