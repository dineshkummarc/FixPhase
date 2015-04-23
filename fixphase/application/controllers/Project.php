<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Project extends CI_Controller{

  

  public function view($type){
    //use this to insure that the request is coming from an ajax call not from a browser
    if($this->input->is_ajax_request()){
      if($type === "all"){
        //request to get all the projects in the database
        //will return ids and names only
        $this->load->model('project_model');
        $json = new stdClass();
        $json->session_id = $this->session->userdata('session_id');
        $json->data = new stdClass();
        $json->data->projects = $this->project_model->get_all_projects(0, 500);
        $json->error = new stdClass();
        $json->error->status = "false";
        echo json_encode($json);
        /*
        {
          "session_id":null,
          "data":
            {
              "projects":
                [
                  {"project_id":"1","project_name":"game"},
                  {"project_id":"2","project_name":"hayyy"}
                ]
            },
          "error":{"status":"false"}
        }
        */

      }else{
        //request to get data about a specific project with the project id
        $this->load->model('project_model');
        $json = new stdClass();
        $json->session_id = $this->session->userdata('session_id');
        $json->data = new stdClass();
        $json->data->project = $this->project_model->get_project(intval($type))[0];
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
    }
  }
}
