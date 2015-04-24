<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Defect extends CI_Controller{
     public function index($id){
          $this->load->model('defect_model');
          $Defect = $this->defect_model->retrieve($id); //Retrieve this defect
          $this->load->view("Defect_view", array("data" => $Defect)); //Show the defect in HTML format
     }
     public function view($id, $mode = "none"){ //GET THIS DEFECT IN JSON FORMAT
          if($mode == "none"){ //Is it a request to the API or a normal user?
               $this->index($id);
               return;
          }
          else if($mode == "all"){
               $this->viewall($id);
          }
          else{
               $this->load->model("defect_model");
               echo json_encode($this->defect_model->retrieve($id)); //Spit out the defect in JSON format
          }
     }
     public function viewall($id){ //GET ALL THE DEFECTS FOR A GIVEN PROJECT ID
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
     public function create(){ //Create a new defect
          if(!$this->input->post("title"))
               $this->load->view("Defect_submit"); //Form is not submitted, Show him the view
          else{ //Form submitted, Validate it
               $this->load->model("defect_model");
               $this->form_validation->set_rules('title','Headline','required|min_length[8]|max_length[128]|xss_clean');
               $this->form_validation->set_rules('severity','Severity','required|max_length[16]|xss_clean');
               $this->form_validation->set_rules('priority','Priority','required|max_length[16]|xss_clean');
               $this->form_validation->set_rules('product','Product','required|max_length[16]|is_numeric|xss_clean');
               $this->form_validation->set_rules('description','Description','required|max_length[1024]|min_length[32]|xss_clean');
               $this->form_validation->set_rules('platform', 'Platform', 'required|max_length[32]|min_length[2]|xss_clean');
               $this->form_validation->set_rules('version', 'Version', 'required|max_length[32]|min_length[2]|xss_clean');
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

                     $this->Defects->insert($data);
                     header("Location: ".base_url."Project/view/".$this->input->post("product"));
               }
               else{ //User is dumb, Show him some errors.
                    $this->load->view("Defect_submit");
               }
          }
     }

}
