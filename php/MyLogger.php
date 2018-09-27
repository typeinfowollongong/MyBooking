<?php

class MyLogger {
   
    private static $_level;
    private static $_file;
    
    public static $ERROR = "ERROR";
    public static $WARN = "WARN";
    public static $INFO = "INFO";
    public static $DEBUG = "DEBUG";
    
    private function __construct() {}
    private static $initialized = false;
    private static function initialize()
    {
        if (self::$initialized){
            return;
        }
        
        error_log( "Hello, errors!" );
        self::getConfigValue('config.ini');
        self::$initialized = true;
    }
    
    private static function getConfigValue($ini_path) {
        //print_r('start connecting...');
        $ini_array      = parse_ini_file($ini_path, true);
        //print_r('array: '. json_encode($ini_array) );
        
        $_level   = $ini_array['logging']['level'];
        $_file   = $ini_array['logging']['file'];
        print_r('level: '.$_level);
        print_r('file: '.$_file);
        /*
         print_r('HOST: '.$this->dbhost);
         print_r('USER: '.$this->dbuser);
         print_r('PASS: '.$this->dbpass);
         print_r('NAME: '.$this->dbname);
         */
        
        //ini_set("log_errors", 3);
        //ini_set("error_log", $_file);
    }
    
    /**
     * logging
     * format 
     * [2017-03-20 3:35:43] [INFO] [file.php] Here we are
     * [2017-03-20 3:35:43] [ERROR] [file.php] Not good
     * [2017-03-20 3:35:43] [DEBUG] [file.php] Regex empty
     */
    public static function log($msg, $level, $file){
        error_log( $msg );
        self::initialize();
        switch ($level) {
            case "ERROR":
                error_log(date("[Y-m-d H:i:s]")."\t[".$level."]\t[".basename(__FILE__)."]\t".$msg."\n", 3, $file);
                error_log("\t[".$level."]\t[".basename(__FILE__)."]\t".$msg."\n", 0);
                echo "Logging error";
                break;
            case $WARN:
                if($_level !== $ERROR) {
                    error_log(date("[Y-m-d H:i:s]")."\t[".$level."]\t[".basename(__FILE__)."]\t".$msg."\n", 3, $file);
                    error_log("\t[".$level."]\t[".basename(__FILE__)."]\t".$msg."\n", 0);
                }
                break;
            case $INFO:
                if($_level !== $ERROR && $_level !== $WARN) {
                    error_log(date("[Y-m-d H:i:s]")."\t[".$level."]\t[".basename(__FILE__)."]\t".$msg."\n", 3, $file);
                    error_log("\t[".$level."]\t[".basename(__FILE__)."]\t".$msg."\n", 0);
                }
                break;
            case $DEBUG:
                if($_level !== $ERROR && $_level !== $WARN && $_level !== $INFO) {
                    error_log(date("[Y-m-d H:i:s]")."\t[".$level."]\t[".basename(__FILE__)."]\t".$msg."\n", 3, $file);
                    error_log("\t[".$level."]\t[".basename(__FILE__)."]\t".$msg."\n", 0);
                }
                break;
            default:
                echo "Your favorite color is neither red, blue, nor green!";
        }
    }
}
?>
