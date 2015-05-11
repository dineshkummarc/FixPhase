<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH.'/libraries/Auth_Controller.php';

class Project extends Auth_Controller{

    public function index(){
        echo "index";
    }

    public function index_get(){
        //GET requests
        //use this to insure that the request is coming from an ajax call not from a browser
        //if($this->input->is_ajax_request()){
        if($this->get('pid') == null){
            $this->get_all_user_projects();
        }else{
            //request to get data about a specific project with the project id
            $this->get_project($this->get('pid'));
        }
        //}
    }

    public function index_post(){
        //POST requests
        $this->response('ssss');
        echo 'ssss';
    }

    public function index_delete(){
        //DELETE requests
        echo "delete";
    }

    public function index_put(){
        //PUT requests
        $json = $this->post('data');
        $this->response('ssss'+$json);
        //$data = json_decode($json);
        //$this->load->model('project_model');
        //print_r($data);
        //echo "AAADDDDDDDDDDDDDDDDDDDDDADDDDDDDDDDDDDDDDDDDDDD";
    }

    /////////////////////// STUB ///////////////////
    public function temp_get($status = ''){
        $this->load->model('project_model');

        print_r( $this->project_model->get_bugs_count('1', $status));
    }

    ////////////////////// NOT FINISHED ////////////////
    public function create_project_get(){
        $this->load->model('project_model');
        echo $this->project_model->insert_project('pppp','dasasdasd',$this->session->userdata('user_id'));
    }

    public function get_project($project_id){
        //request to get data about a specific project with the project id
        /*
        {
            "data":
            {

                ‘summary’ : ‘ ’,
                ‘owner’: ‘’,
                ‘contributors’ : [ { ‘username’ : ‘ ‘, ‘id’ : ‘ ’ } ],
                ‘statistics’ :
                {
                    ‘total_bugs’ : ‘ ‘,
                    ‘opened_bugs’ : ‘ ‘,
                    ‘assigned_bugs’ : ‘ ‘,
                    ‘solved_bugs’ : ‘ ‘,
                    ‘closed_bugs’ : ‘ ‘
                }

            },
            "error":{"id":""}
        }
        */
        $this->load->model('project_model');
        $data = $this->project_model->get_project($project_id);
        if($data){
            if($this->get('user_id') == $this->session->userdata('user_id')){
                $statistics = new stdClass();
                $statistics->total_bugs = $this->project_model->get_bugs_count($project_id, '');
                $statistics->opened_bugs = $this->project_model->get_bugs_count($project_id, 'opened');
                $statistics->assigned_bugs = $this->project_model->get_bugs_count($project_id, 'assigned');
                $statistics->solved_bugs = $this->project_model->get_bugs_count($project_id, 'solved');
                $statistics->closed_bugs = $this->project_model->get_bugs_count($project_id, 'closed');

                $json = array(
                    'data' => array(
                        'summary' => $data->description,
                        'owner' => $data->created_by,
                        'contributors' => $this->project_model->get_contributors($project_id),
                        'statistics' => $statistics
                    )
                );
            }else{
                //unauthorized
                $json = array(
                    'data' => '',
                    'error' => array(
                        'id' => '1'
                    )
                );
            }
            $this->response($json);
        }else{
            //not found
            $this->response('',404);
        }
    }

    public function get_all_user_projects(){
        //request to get all the projects in the database
        //will return ids and names only
        /*
        {
          "data":
            {
                [
                  {"project_id":"1","project_name":"game"},
                  {"project_id":"2","project_name":"hayyy"}
                ]
            },
          "error":{"id":""}
        }
        */
        $this->load->model('project_model');
        $data = $this->project_model->get_all_user_projects($this->session->userdata('user_id'), 0, 500);
        if($data){
            if($this->get('user_id') == $this->session->userdata('user_id')){

                $json = array(
                    'data' => $data
                );

            }else{
                //unauthorized
                $json = array(
                    'data' => '',
                    'error' => array(
                        'id' => '1'
                    )
                );
            }
            $this->response($json);
        }else{
            //not found
            $this->response('',404);
        }
    }

    public function get_all_projects(){
        //request to get all the projects in the database
        //will return ids and names only
        /*
            {
              "data":
                {
                    [
                      {"project_id":"1","project_name":"game"},
                      {"project_id":"2","project_name":"hayyy"}
                    ]
                },
              "error":{"message":""}
            }
        */
        $this->load->model('project_model');
        $data = $this->project_model->get_all_projects(0, 500);
        if($data){
            if($this->get('user_id') == $this->session->userdata('user_id')){

                $json = array(
                    'data' => $data
                );
            }else{
                //unauthorized
                $json = array(
                    'data' => '',
                    'error' => array(
                        'id' => '1'
                    )
                );
            }

            $this->response($json);
        }else{
            //not found
            $this->response('',404);
        }


    }

}
