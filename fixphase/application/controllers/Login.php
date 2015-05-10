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

  public function index($msg = null){
    if($this->session->userdata('logged_in')){ // Moataz: This variable check whether you are validated or not
        //header("Location: ".base_url()."Home");// what is this for ?? asked By Moataz
        redirect('/');
    }else{
        // Make it load the default login form in case he isn't logged in
        $data['msg']=$msg;
        $this->load->view('login_view',$data);
    }
  }

    /**
     *This function is used to validate the user/pass from the login field
     * it is called from login view
     *
     * Author : Moataz M. Farid
     */
  public function validate(){
        if(!$this->session->userdata('logged_in')){
            //load librarries , models
            $this->load->model('user_model');


            // password validation
            $this->form_validation->set_rules('password', 'Password', 'required|min_length[4]|max_length[32]');



            // grab user input
            $user_email = $this->security->xss_clean($this->input->post('user_email')); // get user or email from visitor

            $password = $this->security->xss_clean($this->input->post('password')); // get password from visitor


            //data to send to view
            $isUser_Email_Correct = "neither email nor username is correct ";      //You keep assigning values to this variable but you never check it, What's it for?
            $user = null;
            $email = null;
            $isLogged = null;

//        running form validation
            if ($this->form_validation->run() == FALSE)
            {
                //var_dump($user_email); // used for test
                // then it is not valid
                $isValidForm=false;
            }else{
                // then it is valid form

                if($this->user_model->isemail($user_email)){ // check if the entered is an email
                    // Validation Rules For Email Field
                    $this->form_validation->set_rules('user_email', 'Email', 'required|xss_clean|valid_email');
                    $isUser_Email_Correct = true;
                    $email = $user_email; // assign input value to var $email

                }else if($this->user_model->isusername($user_email)){ // check if the entered is an username
                    // Validation For Name Field
                    $this->form_validation->set_rules('user_email', 'Username', 'required|xss_clean|min_length[4]|max_length[32]');
                    $isUser_Email_Correct = true;
                    $user = $user_email; // assign input value to var $user
                }else{
                    $isUser_Email_Correct = "neither email nor username is correct ";
                }
                $isValidForm=true;
                //$this->load->view('formsubmit');
            }
            $data['isValidForm']=$isValidForm; // this will be used in the view to identify that the form is valid
            $data['isUser_Email_Correct']=$isUser_Email_Correct; // this will be used in the view to identify that user_email_is_correct

            if($this->user_model->logging($user,$email,$password)){

                $this->session->set_userdata('logged_in',true);
                $this->session->set_userdata('username',$user);
                $this->session->set_userdata('email',$email);


                ///// logging check complete you can redirect to whatever you want
                redirect('Home');// go to home view

            }else{
                $this->session->set_userdata('logged_in',false);
                $this->index("Wrong user/pass");
            }
        }else{
            redirect('/');
        }
  }

    /**
     *This is a basic logout function it just destroy complete session
     * author : Moataz M Farid
     */
    function logout(){
        $this->session->sess_destroy();
        redirect('login');
    }


  //<===========WORK==========>
  //Unit testing
  //you have to make a function that calls your function with several
  //inputs to varify it is working probably
  //and print the error message if present
  //<===========WORK==========>


}
