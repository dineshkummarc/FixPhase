<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Defect extends CI_Controller{
     public function index($id){
          $this->load->model('Defects');
          $Defect = $this->Defects->retrieve($id);
          $this->load->view("Defect_view", array("data" => $Defect));
     }
     public function view($id, $mode = "none"){ //GET THIS DEFECT IN JSON FORMAT
          if($mode != "json"){
               $this->index($id);
               return;
          }

          $this->load->model("Defects");
          echo json_encode($this->Defects->retrieve($id));
     }
     public function viewall($id){ //GET ALL THE DEFECTS FOR A GIVEN PROJECT ID
          $this->load->model('Defects');
          $Defects = $this->Defects->retrieveAll($id);
          $JSON_Defects = array();
          if(empty($Defects)){
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
               foreach($Defects as $defect){
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


}
