<?php
/**
 * Created by PhpStorm.
 * User: Lenovo
 * Date: 4/28/2015
 * Time: 9:02 AM
 */

require_once APPPATH.'/libraries/Auth_Controller.php';

class Home extends Auth_Controller{
    public function index_get(){
        //GET requests
        echo "get";
        $this->load->view('home_view.html');
    }

    public function index_post(){
        //POST requests
        echo "post";
    }

    public function index_delete(){
        //DELETE requests
        echo "delete";
    }

    public function index_put(){
        //PUT requests
        echo "put";
    }
    public function index()
    {
        $this->load->view('home_view');
    }
}