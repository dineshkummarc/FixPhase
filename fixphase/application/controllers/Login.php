<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller{


  //<===========WORK==========>
  //this controller still lacks two functions
  //==>Forget Password
  //the user forget his/her password
  //so he enters his email then an email is sent to him
  //containing username - email - password
  //and a link to the change password form
  //==>change password
  //you have to make a view for the change password
  //you go this view from inside the home view
  //you can get the userid from the session
  //and then the form contains the following fields
  //old password - new password - confirm new password
  //you have to check that the old password is true
  //if true updated to the new password
  //<===========WORK==========>
  public function index(){
    if($this->session->userdata('id')){
          header("Location: ".base_url()."Home");
    }
    $this->load->view("Login_view");  // Make it load the default login form in case he isn't logged in
  }
  public function validate(){
    // password validation
    $this->form_validation->set_rules('password', 'Password', 'required|xss_clean|min_length[8]|max_length[32]');

    // grab user input
    $user_email = $this->security->xss_clean($this->input->post('user_email'));

    $password = $this->security->xss_clean($this->input->post('password'));

    // load
    $this->load->model('user_model');

    //data to send to view
    $isUser_Email_Correct = "neither email nor username is correct ";      //You keep assigning values to this variable but you never check it, What's it for?
    $user = null;
    $email = null;
    $isLogged = null;

    //
    if ($this->form_validation->run() == FALSE)
    {
      //var_dump($user_email); // used for test
      // not valid
      $isValidForm=false;
    }else{
      // valid form
      if($this->user_model->isemail($user_email)){
        // Validation For Email Field
        $this->form_validation->set_rules('user_email', 'Email', 'required|xss_clean|valid_email');

        $isUser_Email_Correct = true;
        $email = $user_email;

      }else if($this->user_model->isusername($user_email)){
        // Validation For Name Field
        $this->form_validation->set_rules('user_email', 'Username', 'required|xss_clean|min_length[4]|max_length[32]');

        $isUser_Email_Correct = true;
        $user = $user_email;
      }else{
        $isUser_Email_Correct = "neither email nor username is correct ";
      }
      $isValidForm=true;
      //$this->load->view('formsubmit');
    }
    $data['isValidForm']=$isValidForm;
    $data['isUser_Email_Correct']=$isUser_Email_Correct;

    if($this->user_model->Logged($user,$email,$password)){
      $data['isLogged']=$isLogged;
      $isLogged= true;
      $this->session->set_userdata('isLogged','true');
      $this->session->set_userdata('username',$user);
      $this->session->set_userdata('email',$email);
    }else{
      $isLogged=false;
      $data['isLogged']=$isLogged;

    }
    if(!$isLogged){
      $this->index("Wrong user/pass");
    }
    else{
      $this->session->set_userdata('validate',true);   //What is this variable used for?
      $this->load->view('home_view');
    }


  }



  //<===========WORK==========>
  //Unit testing
  //you have to make a function that calls your function with several
  //inputs to varify it is working probably
  //and print the error message if present
  //<===========WORK==========>


}
