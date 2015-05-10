<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH.'/libraries/Auth_Controller.php';

class Project extends Auth_Controller{

  public function index(){
    echo "index";
  }

  public function index_get(){

    if($this->get('pid') == null){
      $this->load->model('project_model');
      $projects = $this->project_model->get_all_projects(0, 500);
      $this->response(array("data" => $projects));
        /*
        {
          "data":
                [
                  {"project_id":"1","project_name":"game"},
                  {"project_id":"2","project_name":"hayyy"}
                ]
          "error":{"msg": "msg"} //exist only if error
        }
        */

      }else{
            //request to get data about a specific project with the project id
            $this->load->model('project_model');
            $json = new stdClass();
            $json->session_id = $this->session->userdata('session_id');
            $json->data = new stdClass();
            $json->data->project = $this->project_model->get_project($this->get('pid'));
            $json->error = new stdClass();
            $json->error->status = "false";
            $json->error->message = "";
        echo json_encode($json);
        /*
        {
          "session_id":null,
          "data":
            {
              "project":{"project_id":"1", "project_name":"game"}
            },
          "error":{"status":"false"}
        }
        */
      }
    //}
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

}
