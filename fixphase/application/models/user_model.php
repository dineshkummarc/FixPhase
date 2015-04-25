<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class user_model extends CI_Model{

    //function to insert a new user in the database
    //<===========WORK==========>
    //you can not use "$this->input->post('Fname')" such input functions
    //in the model this should be handled in the controller and then you call
    //your function with parameters
    //so the function should be public function insert_user($fname, $lname, $username, $password, $email)
    //in the model you don't echo anything you should return some thing
    //like if you only have two options either to insert or to fail
    //if the action was successful you should return true either return false
    //if you have more alternatives you should return a discribtive string
    //<===========WORK==========>
    //<===========Ali & Bassem=============>
    public function insert_user()
    {
      $fname= strtolower($this->input->post('Fname'));
      $lname= strtolower($this->input->post('Lname'));
      $data = array(
        'username'=> strtolower($this->input->post('username')),
        'password'=> strtolower($this->input->post('password')),

        'email'=> strtolower($this->input->post('email')),
        'full_name'=> $fname . " " . $lname
      );


      $query = $this->db->insert('users',$data);
      if($query)
      {
        //use a discribtive message please :D :D
        echo "3aab 3alaak";
      }
      else
      {
        //same here
        echo "bdan naak";
      }

    }

    //<============Moataz============>
        /**
     * This Function used to check is email exists in db
     * @param $email
     * @return bool
         * Author : Moataz M. Farid
     */
    public function isemail($email){
        $email = strtolower ($email);
        $sql='Select * from `users` where `email` = ?';
        $query = $this->db->query($sql,array($email));
        if($query->num_rows() == 1){
            return true;
        }
        return false;
    }

    /**
     * This Function used to check is username exists in db
     * @param $user
     * @return bool
     * Author : Moataz M. Farid
     */
    public function isusername($user){
        $user = strtolower ($user);
        $sql='Select * from `users` where `username` = ?';
        $query = $this->db->query($sql,array($user));
        if($query->num_rows() == 1){
            // user exists and
            return true;
        }
        //var_dump($user); // used for test
        return false;
    }

    /**
     * This function return true if user exists and false if user/email + password don't match
     * @param $user
     * @param $email
     * @param $password
     * @return bool
     * Author : Moataz M. Farid
     */
    public function logging($user,$email,$password){
        $user = strtolower ($user);
        $email = strtolower ($email);
    //        var_dump($user); // testing
    //        var_dump($email); // testing

        if($this->isemail($email)&&isset($password)){
            $sql='Select * from `users`  where `email` = ? and `password` = ?';
            $query = $this->db->query($sql,array($email,$password));
            if($query->num_rows() > 0){
                // user exists and
                return true;
            }
        }elseif($this->isusername($user)&&isset($password)){
            $sql='Select * from `users` where `username` = ? and `password` = ?';
            $query = $this->db->query($sql,array($user,$password));
            if($query->num_rows() == 1){
                // user exists and
                return true;
            }
        }else{
            return false;
        }
    }

#    public function insert_user()
#    {
#    $fname= strtolower($this->input->post('Fname'));
#    $lname= strtolower($this->input->post('Lname'));
#    $data = array(
#    'username'=> strtolower($this->input->post('username')),
#    'password'=> strtolower($this->input->post('password')),

#    'email'=> strtolower($this->input->post('email')),
#     'full_name'=> $fname . " " . $lname
#    );


#    $query = $this->db->insert('users',$data);
#    if($query)
#    {
#     echo "3aab 3alaak";
#    }
#        else
#     {
#       echo "bdan naak";
#     }

#    }
}
