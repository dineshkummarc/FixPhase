<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH.'/libraries/Auth_Controller.php';

class Defect extends Auth_Controller{

     public function __construct(){
          parent::__construct();
          $this->response->format = 'json';
     }
     public function index_get($did = "index"){
          $this->load->model("defect_model");
          $this->defect_model->unit_tests(); die;
          if($did == 'index' && !$this->get('pid') && !$this->get('did'))
               $this->load->view("errors/no_defect");
          else if(is_numeric($did)){
               $this->load->model("defect_model");
               $result = $this->defect_model->retrieve($did);
               if($result == false)
                    $this->load->view("errors/no_defect");
               else
                    $this->load->view("defect_view", $result);
          }
          else if($this->get('user_id') && $this->get('did'))
               $this->view($this->get('did'));
          else if($this->get('user_id') && $this->get('pid'))
               $this->viewall($this->get('pid'));
     }

     public function index_post(){
          $defect = $this->post('defect');
          if(! $this->authorized($defect['user_id'], $defect['project_id']))
               $this->response(array('error' => array('id' => 1)));
          $this->load->model('defect_model');
          $data = array(
                         'title' => $defect['title'],
                         'description' => $defect['description'],
                         'status' => $defect['status'],
                         'date_raised' => date('Y-m-d'),
                         'related_project_id' => $defect['pid'],
                         'created_by' => $defect['user_id'],
                         'assigned_to' => isset($defect['assigned_to']) ? $defect['assigned_to']:$defect['user_id'],
                         'severity' => $defect['severity'],
                         'priority' => $defect['priority']
          );
          $status = $this->defect_model->insert($data);
          if(is_numeric($status))
               $this->response('',200);
          else
               $this->response('', 404);
     }

     public function index_delete(){
          $data = $this->delete('defect');
          if(! $this->authorized($defect['user_id'], $this->get_project_of($defect['did'])))
               $this->response(array('error' => array('id' => 1)));
          $this->load->model('defect_model');
          $status = $this->defect_model->delete($data['did']);
          if($status == 1)
               $this->response('', 200);
          else
               $this->response('', 404);
     }
     public function index_put(){
         $defect = $this->put('defect');
          if(! $this->authorized($defect['user_id'], $this->get_project_of($defect['did'])))
               $this->response(array('error' => array('id' => 1)));
          $this->load->model('defect_model');
          $data = array(
                         'title' => $defect['title'],
                         'description' => $defect['description'],
                         'status' => 'Open',
                         'assigned_to' => $defect['assigned_to'],
                         'severity' => $defect['severity'],
                         'priority' => $defect['priority'],
                         'target_resolution_date' => $defect['target_date'],
                         'actual_resolution_date' => $defect['actual_date'],
                         'date_closed' => $defect['date_closed'],
                         'note' => $defect['note'],
                         'version' => $defect['version'],
                         'platform' => $defect['platform']
          );
          $status = $this->defect_model->update($data, $defect['did']);
          if($status == 1)
               $this->response('',200);
          else
               $this->response('', 404);
     }
     public function comment_get(){
          $did = $this->get('did');
          $user_id = $this->get('user_id');
          if($did && $user_id){
               $this->load->model('comments');
               $result = $this->comments->retrieve_defect_comments($did);
               if($result){
                    if(!$this->authorized($user_id, $this->get_project_of($did)))
                         $this->response(array('error' => array('id' => 1)));
                    else
                         $this->response($result);
               }
               else
                    $this->response('',404);
          }
          else
               $this->response('',404);
     }
     public function comment_post(){
          $this->load->model('comments');
          $data = $this->post('data');
          if(!$data){
               $this->response(array('error' => 2));
          }
          else{
               if(!$this->authorized($data['user_id'], $data['pid']))
                    $this->response(array('error' => array('id' => 1)));
               $comment = array(
                    'project_id' => $data['pid'],
                    'defect_id' => $data['did'],
                    'user_id' => $data['comment']['user_id'],
                    'comment' => $data['comment']['comment']
               );
               $this->comments->insert($data);
          }
     }
     public function comment_put(){
          $this->load->model('comments');
          $data = $this->put('data');
          if(!$data){
               $this->response(array('error' => 2));
          }
          else{
          if(!$this->authorized($data['user_id'], $data['pid']))
               $this->response(array('error' => array('id' => 1)));
          $comment =  array(
               'project_id' => $data['pid'],
               'defect_id' => $data['did'],
               'user_id' => $data['comment']['user_id'],
               'comment' => $data['comment']['comment']
          );
          $this->comments->update($comment, $data['cid']);
          }
     }
     public function comment_delete(){
          $this->load->model('comments');
          $data = $this->delete('data');
          $delete_comment = array('comment_id' => $data['cid']);
          $this->comments->delete($delete_comment);
     }
     public function _remap($method, $params = array()){  //Solution for the problem arising when parameters are passed to the index func
          if(method_exists($this, $method.'_'.strtolower($this->input->server('REQUEST_METHOD')))){    //Does this controller have the requested method?
               call_user_func_array(array($this, $method.'_'.strtolower($this->input->server('REQUEST_METHOD'))), $params);  //Call it
          }
          else{     //No it doesn't, Assume index.
               $this->index_get($method);
          }
     }
     protected function authorized($user_id, $project_id){
          $this->load->model("user_model");
          return $this->user_model->is_authorized($user_id, $project_id);
     }
     protected function get_project_of($id){
          $this->load->model('defect_model');
          $result = $this->defect_model->get_project($id);
          if(is_numeric($result))
               return $result;
          else return -1;
     }
     protected function view($id){ //RESPOND WITH THIS DEFECT
               $this->load->model("defect_model");
               $result = $this->defect_model->retrieve($id);
               if($result == false)
                    $this->response('',404);
               else{
                    if(!$this->authorized($this->get('user_id'), $this->get_project_of($id)))
                         $this->response(array('error' => array('id' => 1)));
                    $this->response($result);
               }
     }
     protected function viewall($id){ //GET ALL THE DEFECTS FOR A GIVEN PROJECT ID
          $this->load->model('defect_model');
          $Defects = $this->defect_model->retrieveAll($id); //Get all defects for project of id = $id
          $Prj_Defects = array();
          //$project;
          if(!$Defects){ //No defects found, Raise an error
               $project = 404;
          }
          else {
               foreach($Defects as $defect){ //All is well, Customize what should be sent through JSON
                    $Prj_Defects[] = array(
                         "id" => $defect->defect_id,
                         "name" => $defect->title,
                         "status" => $defect->status,
                         "priority" => $defect->priority,
                         "severity" => $defect->severity
                    );
               }
                    $project = array(
                    'session_id' => $this->session->userdata('session_id'),
                    'data' => $Prj_Defects,
                    'error' => array(
                         'status' => false,
                         'message' => ""
                    )
               )    ;
          }
          if($project == 404)
               $this->response('', 404);
          else{
               if(!$this->authorized($this->get('user_id'), $id))
                    $this->response(array('error' => array('id' => 1)));
               $this->response($project);
          }
     }
     public function create($project = "none"){ //Create a new defect
          $this->load->model("project_model");
          $this->load->library('upload', array(
                                             'upload_path' => "../public/uploads",
                                             'allowed_types' => "jpg|png",
                                             'max_size' => "2048",
                                             'max_width' => "1024",
                                             'max_height' => "768",
                                             'encrypt_name' => true
          ));
          if($project == "none" || !$this->project_model->project_exists($project)){
               $this->load->view("errors/no_project");
          }
          else {
               if(!$this->input->post("product"))
                    $this->load->view("defect_submit", array("project_id" => $project)); //Form is not submitted, Show him the view
               else{ //Form submitted, Validate it
                    $this->load->model("defect_model");
                    $this->form_validation->set_rules('title','Headline','required|trim|min_length[8]|max_length[128]');
                    $this->form_validation->set_rules('severity','Severity','required|trim|max_length[16]');
                    $this->form_validation->set_rules('priority','Priority','required|trim|max_length[16]');
                    $this->form_validation->set_rules('product','Product','required|trim|max_length[16]|is_numeric|callback_project_exists');
                    $this->form_validation->set_rules('description','Description','required|trim|max_length[1024]|min_length[32]');
                    $this->form_validation->set_rules('platform', 'Platform', 'required|trim|max_length[32]|min_length[2]');
                    $this->form_validation->set_rules('version', 'Version', 'required|trim|max_length[32]|min_length[2]');
                    if($this->form_validation->run() !== false && $this->upload->do_upload("screenshot")){ //Form is valid, Can process to the DB
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
                          $filepath = $this->upload->data('full_path');
                          $defect_id = $this->defect_model->insert($data);
                          $this->load->model("reference_model");
                          $this->reference_model->insert(array("defect_id" => $defect_id, "ref_path" => $filepath));
                          header("Location: ".base_url()."Project/view/".$this->input->post("product"));
                    }
                    else{ //User is dumb, Show him some errors.
                         $this->load->view("defect_submit", array("project_id" => $project, "errors" => $this->upload->display_errors()));
                    }
               }
          }
     }
     protected function project_exists($id){
          $this->load->model("project_model");
          if($this->project_model->project_exists($id)){
               return true;
          }
          else{
               $this->form_validation->set_message('project_exists','Project not found');
               return false;
          }
     }
	  public function search_get(){
		$severity =  $this->get('severity');
		$priority = $this->get('priority');
		$status =  $this->get('status');
		$this ->load ->model("defect_model");
		if(!$severity && !$priority && !$status)
		     $this->response('', 404);
		$results = $this->defect_model->search($severity, $priority, $status);
		$this->response($results);
	}
}
