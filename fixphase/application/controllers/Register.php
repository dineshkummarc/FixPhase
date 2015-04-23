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
	  $this->form_validation->set_rules('password', 'Password','required|min_length[8]|max_length[12]|strtolower');
	  $this->form_validation->set_rules('cpassword', 'Confirm Password','required|strtolower|matches[password]');

    If($this->form_validation->run())
	  {
      //<===========WORK==========>
      //you are not sending the role to the database
      //you should check why it is not sent
      //==========================
      //you should check the insert opertation
      //if it is successful you should redirect him to the home controller
      //and then set the session data will explain this later but search for it session is a part of codeigniter
      //if not do nothing
      //redirect is function in codeiginter
      //<===========WORK==========>
  	  $this->load->model('user_model');
  	  $this->user_model->insert_user();
    }
    else
    {
      //<===========WORK==========>
      //when you do this the fields are emptyed because you are loading the page again
      //you need to preserve the data of all the fields and return it after you reload the page
      //<===========WORK==========>
  	  $this->load->view('Register_view');

    }
  }

  //<===========WORK==========>
  //Unit testing
  //you have to make a function that calls the validate function with several
  //inputs to varify it is working probably
  //<===========WORK==========>



}
