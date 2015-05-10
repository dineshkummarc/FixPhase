<?php
/**
 * Created by PhpStorm.
 * User: Lenovo
 * Date: 4/28/2015
 * Time: 9:02 AM
 */

require_once APPPATH.'/libraries/Auth_Controller.php';

class NotFound extends Auth_Controller{
    public function index()
    {
        $this->load->view('home_view');
    }
}