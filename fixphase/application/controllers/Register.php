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
      if(!$this->session->userdata('logged_in')){
          $this->form_validation->set_rules('username', 'Username','required|alpha_dash|trim|min_length[4]|max_length[32]|is_unique[users.username]|strtolower');
          $this->form_validation->set_rules('email', 'Email','required|trim|is_unique[users.email]|valid_email|strtolower');
          $this->form_validation->set_rules('password', 'Password','required|min_length[8]|max_length[12]|strtolower');
          $this->form_validation->set_rules('cpassword', 'Confirm Password','required|strtolower|matches[password]');

          If($this->form_validation->run())
          {
              //<===========WORK==========>
              //you are not sending the role to the database
              //you should check why it is not sent
              //==========================
              //you should check the insert operation
              //if it is successful you should redirect him to the home controller
              //and then set the session data will explain this later but search for it session is a part of codeigniter
              //if not do nothing
              //redirect is function in codeiginter
              //<===========WORK==========>
              $this->load->model('user_model');
              $fname= strtolower($this->input->post('Fname'));
              $lname= strtolower($this->input->post('Lname'));
              $data = array(
                  'username'=> strtolower($this->input->post('username')),
                  'password'=> strtolower($this->input->post('password')),
                  'email'=> strtolower($this->input->post('email')),
                  'role'=> strtolower($this->input->post('role')),
                  'full_name'=> $fname . " " . $lname
              );

              if($this->user_model->insert_user($data)){
                  redirect('login');
                  //$this->session->set_userdata($data);
              }else{
                  echo "An error was encountered";
              }
          }
          else
          {
              //<===========WORK==========>
              //when you do this the fields are emptyed because you are loading the page again
              //you need to preserve the data of all the fields and return it after you reload the page
              //<===========WORK==========>
              $temp_data = array(
                  'username'=> $this->input->post('username'),
                  'email'=> $this->input->post('email'),
                  'role'=> $this->input->post('role'),
                  'fname'=> $this->input->post('Fname'),
                  'lname'=> $this->input->post('Lname')
              );

              $this->session->set_userdata('fields',$temp_data);
              $this->load->view('Register_view',$this->session->userdata('fields'));
          }
      }else{
          redirect('Home');
      }
  }

  //<===========WORK==========>
  //Unit testing
  //you have to make a function that calls the validate function with several
  //inputs to varify it is working probably
  //<===========WORK==========>

/*
    public function unitTest(){
        $this->unit->run($this->validate('abc', 'abc@abc.com', '12345678', 'First', 'Last'),'is_false', "Invalid inputs test");
        $this->unit->run($this->validate('abcdef', 'example@email.com', '12345678', 'First', 'Last'),'is_null', "Valid inputs test");
        $this->load->view('tests');
    }
*/


}
