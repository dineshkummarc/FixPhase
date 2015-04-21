<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Register extends CI_Controller{


  //use it to load the view of register to the user when the url /Register is loaded
  public function index(){
	  $this->load->view('Register_view');

  }
  //use this to validate the input from the user
  //Either the input is okay make a function to insert the user data in database
  //or return an error
  public function validate(){
	  
	  $this->form_validation->set_rules('username', 'User Name','required|alpha_dash|trim|min_length[4]|max_length[32]|is_unique[users.username]|strtolower');
	  $this->form_validation->set_rules('email', 'Email','required|trim|is_unique[users.email]|valid_email|strtolower');
	  $this->form_validation->set_rules('password', 'Password','required|min_length[8]|max_length[12]|strtolower'|);
	  $this->form_validation->set_rules('cpassword', 'Confirm Password','required|strtolower|matches[password]');
	  If($this->form_validation->run())
	  {
	  $this->load->model('User');
	  $this->User->insert_user();

  }
  else
  {
	  	  $this->load->view('Register_view');

  }


}
}