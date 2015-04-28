<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH.'/libraries/Auth_Controller.php';

class Home extends Auth_Controller {

    public function index_get(){
        //GET requests
        echo "get";
        $this->load->view('home_view');
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

//Ali Magdy Moneib :)
//Bassem Tarek Ahmed Mohamed \o/
// Moataz Farid
