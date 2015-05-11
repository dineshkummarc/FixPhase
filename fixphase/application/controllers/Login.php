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
            redirect('Home');
        }else{
            // Make it load the default login form in case he isn't logged in
            $data['msg']=$msg;
            $this->load->view('login_view',$data);
        }
    }

    /**
     * directs to changes user password view
     * @author: Abdulaziz Mohamed Alaa
     */
    public function change_password($msg = null){
        $data['msg']=$msg;
        $this->load->view('change_password_view', $data);
    }
    /**
     * still a problem with form validation but it is working quiet good
     * changes user password
     * @author: Abdulaziz Mohamed Alaa
     */
    public function change_password_procedure(){
        $this->change_password();
        if($this->input->post('old_password', TRUE) == null){
            redirect('Login');
        }
        if($this->session->userdata('logged_in')) {
            $this->form_validation->set_rules('old_password', 'Old Password','required|min_length[8]|max_length[32]|strtolower');
            $this->form_validation->set_rules('new_password', 'New Password','required|min_length[8]|max_length[32]|strtolower');
            $this->form_validation->set_rules('cpassword', 'Confirm Password','required|strtolower|matches[password]');

            //if($this->form_validation->run()){
                if($this->session->userdata('user_id') != null){
                    $this->load->model('user_model');
                    $data = $this->user_model->get_password($this->session->userdata('user_id'));
                    if($data['status']){
                        if($data['password'] == $this->input->post('old_password', TRUE)){
                            if($this->user_model->update_password($this->session->userdata('user_id'), $this->input->post('new_password', TRUE))) {
                                $this->change_password('Password Changed Successfully');
                            }else{
                                $this->change_password('We encountered some problems');
                            }
                        }else{
                            $this->change_password('Wrong Password my friend!!');
                        }

                    }else{
                        $this->change_password('There is something Wrong!!');
                    }
                }
            //}
        }else{
            redirect('Login');
        }
    }

    /**
     * directs to the forget password view
     * @author: Abdulaziz Mohamed Alaa
     */
    public function forget_password($msg = null){
        $data['msg']=$msg;
        $this->load->view('forget_password_view', $data);
    }

    /**
     * checks if the user exists
     * retrieves the password and send it in an email to the user email address
     * if not do no thing
     * @author: Abdulaziz Mohamed Alaa
     */
    public function forget_password_retrieve(){
        $user = $this->input->post('user_email', TRUE);
        if($user == null){
            redirect('Login');
        }

        $this->load->model('user_model');

        if(filter_var($user, FILTER_VALIDATE_EMAIL)){
            $data = $this->user_model->get_password_email($user);
        }else{
            $data = $this->user_model->get_password_user_name($user);
        }

        if($data['status']){
            //valid user
            $this->load->library('email');

            $config['protocol']    = 'smtp';
            $config['smtp_host']    = 'ssl://smtp.gmail.com';
            $config['smtp_port']    = '465';
            $config['smtp_timeout'] = '7';
            $config['smtp_user']    = 'customers.gonow@gmail.com';
            $config['smtp_pass']    = 'gonow123';
            $config['charset']    = 'utf-8';
            $config['newline']    = "\r\n";
            $config['mailtype'] = 'text'; // or html
            $config['validation'] = TRUE; // bool whether to validate email or not

            $this->email->initialize($config);
            $this->email->set_newline("\r\n");
            $this->email->from('customers.gonow@gmail.com', 'Abdulaziz Alaa');
            $this->email->to($data['email']);

            $this->email->subject('FixPhase - Password');

            $message =  "FixPhase \r\n\n" .
                        "This email is sent upon your request for your password \n\n ".
                        "Your password is: ".$data['password']." \n ".
                        "You can change your password later if you want from inside your account \n\n".
                        "Regards \n".
                        "FixPhase Team \r\n";

            $this->email->message($message);

            if($this->email->send()){
                $this->forget_password('Sent Successfully.');
            }else{
                $this->forget_password('The Email was not sent due to unexpected error please try again in a while.');
                echo $this->email->print_debugger();
            }
        }else{
            //invalid user
            $this->forget_password('Invalid Email.');
        }



    }


    /**
     * validates user through his email or user name and password
     * @author: Abdulaziz Mohamed Alaa
     */
    public function validate(){
        if(!$this->session->userdata('logged_in')){
            //not logged in so do validation process
            //first check if the user wrote an email or username and run a query to check for if this matches a valid user
            $user = $this->input->post('user_email', TRUE);
            $password = $this->input->post('password', TRUE);

            $this->load->model('user_model');
            $data = array();

            if(filter_var($user, FILTER_VALIDATE_EMAIL)){
                //validate user using his/her email
                $data = $this->user_model->check_user_email($user, $password);
            }else{
                //validate user using his/her user name
                $data = $this->user_model->check_user_name($user, $password);
            }

            if($data['status']){
                //valid user
                $this->session->set_userdata('logged_in',true);
                $this->session->set_userdata('user_id',$data['user_id']);
                $this->session->set_userdata('full_name',$data['full_name']);


                //logging check complete you can redirect to whatever you want
                redirect('Home');// go to home view
            }else{
                //invalid user
                $this->session->set_userdata('logged_in',false);
                $this->session->set_userdata('user_id','');
                $this->session->set_userdata('full_name','');
                $this->index("Wrong user/pass");
            }

        }else{
            //already logged in redirect to home page
            redirect('Home');
        }
    }

    /**
     *This function is used to validate the user/pass from the login field
     * it is called from login view
     *
     * Author : Moataz M. Farid
     */
    public function validate1(){
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
            redirect('Home');
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
