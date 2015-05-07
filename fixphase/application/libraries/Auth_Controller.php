<?php
/**
 * Created by PhpStorm.
 * User: Lenovo
 * Date: 4/27/2015
 * Time: 10:30 PM
 */

require_once APPPATH.'/libraries/REST_Controller.php';

class Auth_Controller extends REST_Controller{

    function __construct(){
        parent::__construct();
        if(!$this->session->userdata('logged_in')){
            redirect('Login');
        }
    }

}
