<?php
require_once APPPATH.'/libraries/Auth_Controller.php';

class Users extends Auth_Controller{
    public function index_get()
    {
        //load our model
        $this->load->model("user_model");

        //get the user_id from session
        $id = $this->session->userdata("user_id");
        //now fetch name from model
        $data = $this->user_model->get_user_name($id);
        $json = NULL;

        //check return data from model
        //it cannot happen that the user is not found, unless he is deleted from database but his session is still on!!
        if(!$data){
            //not found
            $json = array("error" => array("id"=>3));
        }
        else{//success
            $json=array("data" => array("user_id" => $id, "name"=> $data->full_name));
        }
        //send it out
        $this->response($json);
    }
}