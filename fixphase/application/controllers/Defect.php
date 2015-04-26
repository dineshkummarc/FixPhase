<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Defect extends CI_Controller{

     public function _remap($method, $params = array()){    //Solution for the problem arising when parameters are passed to the index func
          if(method_exists($this, $method)){      //Does this controller have the requested method?
               call_user_func_array(array($this, $method), $params);  //Call it
          }
          else{     //No it doesn't, Assume index.
               $params[0] = isset($params[0]) ? $params[0]:"none";
               $this->index($method, $params[0]);
          }
     }
     public function index($id = "none", $mode = "none"){
          if($id == "none"){
               $this->load->view("errors/no_defect");
          }
          else{
               switch($mode){
                    case 'none':
                         $this->load->model('defect_model');
                         $Defect = $this->defect_model->retrieve($id); //Retrieve this defect
                         $this->load->view("Defect_view", array("data" => $Defect)); //Show the defect in HTML format
                         break;
                    case 'all':
                         $this->viewall($id);
                         break;
                    case 'json':
                         $this->view($id, "json");
                         break;
               }
          }
     }
     protected function view($id, $mode = "none"){ //GET THIS DEFECT IN JSON FORMAT
          if($mode == "none"){ //Is it a request to the API or a normal user?
               $this->index($id);
               return;
          }
          else if($mode == "json"){
               $this->load->model("defect_model");
               echo json_encode($this->defect_model->retrieve($id)); //Spit out the defect in JSON format
          }
     }
     protected function viewall($id){ //GET ALL THE DEFECTS FOR A GIVEN PROJECT ID
          $this->load->model('defect_model');
          $Defects = $this->defect_model->retrieveAll($id); //Get all defects for project of id = $id
          $JSON_Defects = array();
          if(empty($Defects)){ //No projects found, Raise an error
               $JSON = array(
                    'session_id' => $this->session->userdata('session_id'),
                    'data' => null,
                    'error' => array(
                         'status' => true,
                         'message' => "No defects were found"
                    )
               );
          }
          else {
               foreach($Defects as $defect){ //All is well, Customize what should be sent through JSON
                    $JSON_Defects[] = array(
                         "id" => $defect->defect_id,
                         "name" => $defect->title,
                         "status" => $defect->status,
                         "priority" => $defect->priority,
                         "severity" => $defect->severity
                    );
               }
                    $JSON = array(
                    'session_id' => $this->session->userdata('session_id'),
                    'data' => $JSON_Defects,
                    'error' => array(
                         'status' => false,
                         'message' => ""
                    )
               );
          }
     echo json_encode($JSON);
     }
     public function create($project = "none"){ //Create a new defect
          $this->load->model("project_model");
          if($project == "none" || !$this->project_model->project_exists($project)){
               $this->load->view("errors/no_project");
          }
          else {
               if(!$this->input->post("product"))
                    $this->load->view("Defect_submit", array("project_id" => $project)); //Form is not submitted, Show him the view
               else{ //Form submitted, Validate it
                    $this->load->model("defect_model");
                    $this->form_validation->set_rules('title','Headline','required|trim|min_length[8]|max_length[128]');
                    $this->form_validation->set_rules('severity','Severity','required|trim|max_length[16]');
                    $this->form_validation->set_rules('priority','Priority','required|trim|max_length[16]');
                    $this->form_validation->set_rules('product','Product','required|trim|max_length[16]|is_numeric|callback_project_exists');
                    $this->form_validation->set_rules('description','Description','required|trim|max_length[1024]|min_length[32]');
                    $this->form_validation->set_rules('platform', 'Platform', 'required|trim|max_length[32]|min_length[2]');
                    $this->form_validation->set_rules('version', 'Version', 'required|trim|max_length[32]|min_length[2]');
                    if($this->form_validation->run() !== false){ //Form is valid, Can process to the DB
                         $data = array(
                              'title' => $this->input->post("title"),
                              'severity' => $this->input->post("severity"),
                              'priority' => $this->input->post("priority"),
                              'related_project_id' => $this->input->post("product"),
                              'version' => $this->input->post("version"),
                              'description' => $this->input->post("description"),
                              'status' => 'Open',
                              'date_raised' => date("Y-m-d"),
                              'platform' => $this->input->post('platform'),
                              'identified_by' => $this->session->userdata('session_id')
                               );

                          //$this->Defects->insert($data);
                          //header("Location: ".base_url()."Project/view/".$this->input->post("product"));
                    }
                    else{ //User is dumb, Show him some errors.
                         $this->load->view("Defect_submit", array("project_id" => $project));
                    }
               }
          }
     }
     public function project_exists($id){
          $this->load->model("project_model");
          if($this->project_model->project_exists($id)){
               return true;
          }
          else{
               $this->form_validation->set_message('project_exists','Project not found');
               return false;
          }
     }
}
