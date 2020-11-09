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
        //if he isnot logged then redirect to login
        if(!$this->session->userdata('logged_in')){
            redirect('Login');
        }

        //if this isnot an ajax call then send to SPA
        if (!$this->input->is_ajax_request()) {
            $this->load->view('home_view.html');
            $this->output->_display();
            die();
        }
        //otherwise check tampering in user_id
        else{
            //try to find user id in request
            $user_id = $this->get("user_id");
            if(!$user_id)
            {
                $user_id = $this->post("user_id");
                if(!$user_id)
                    $user_id = $this->put("user_id");
            }
            //if found and it isnot like the on in sessionid then return an error
            if($user_id && $user_id != $this->session->userdata("user_id")){
                //send error, flush it and die
                $this->response(array("error"=> array("id" => "4")), NULL, true);
                die();
            }
        }
    }

}
