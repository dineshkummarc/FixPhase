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
    public function insert_user($data)
    {

        $query = $this->db->insert('users',$data);
        if($query){
            return true;
        }else{
            return false;
        }

    }

    /**
     * @author: Abdulaziz Mohamed Alaa
     */
    public function get_user_by_email($email){
        $this->db->select('user_id, full_name');
        $this->db->where('email',$email);
        $query = $this->db->get('users');
        if($query->num_rows() > 0){
            return $query->result();
        }else{
            return false;
        }
    }

    /**
     * @author: Abdulaziz Mohamed Alaa
     */
    public function get_user_by_name($user){
        $this->db->select('user_id, full_name');
        $this->db->like('full_name',$user);
        $query = $this->db->get('users');
        if($query->num_rows() > 0){
            return $query->result();
        }else{
            return false;
        }
    }

    /**
     * @author: Abdulaziz Mohamed Alaa
     */
    public function get_user_name($user_id){
        $this->db->select('full_name');
        $this->db->where('user_id',$user_id);
        $query = $this->db->get('users');
        if($query->num_rows() > 0){
            return $query->row();
        }else{
            return false;
        }
    }


    //get user password
    /**
     * @author: Abdulaziz Mohamed Alaa
     */
    public function get_password($user_id){
        $this->db->select('password');
        $query = $this->db->get_where('users', array('user_id' => $user_id));
        if($query->num_rows() > 0){
            $row = $query->row();
            $data = array(
                'status' => true,
                'password' => $row->password
            );
        }else{
            $data = array(
                'status' => false,
                'password' => ''
            );
        }
        return $data;
    }

    //updates user password
    /**
     * @author: Abdulaziz Mohamed Alaa
     */
    public function update_password($user_id, $password){
        if($this->db->update('users', array('password' => $password), array('user_id' => $user_id))){
            return true;
        }else{
            return false;
        }
    }

    //check if user exits by his username and get his password and email
    /**
     * @author: Abdulaziz Mohamed Alaa
     */
    public function get_password_email($email){

        $this->db->select('email, password');
        $query = $this->db->get_where('users', array('email' => $email));

        if($query->num_rows() == 1){
            $row = $query->row();
            $data = array(
                'status' => true,
                'email' => $row->email,
                'password' => $row->password
            );
        }else{
            $data = array(
                'status' => false,
                'email' => '',
                'password' => ''
            );
        }

        return $data;
    }
    //check if user exits by his username and get his password and email
    /**
     * @author: Abdulaziz Mohamed Alaa
     */
    public function get_password_user_name($username){

        $this->db->select('email, password');
        $query = $this->db->get_where('users', array('username' => $username));

        if($query->num_rows() == 1){
            $row = $query->row();
            $data = array(
                'status' => true,
                'email' => $row->email,
                'password' => $row->password
            );
        }else{
            $data = array(
                'status' => false,
                'email' => '',
                'password' => ''
            );
        }

        return $data;
    }
    //check if user exits by his username and password
    /**
     * @author: Abdulaziz Mohamed Alaa
     */
    public function check_user_name($username, $password){

        $this->db->select('user_id, full_name');
        $query = $this->db->get_where('users', array('username' => $username, 'password' => $password));

        if($query->num_rows() == 1){
            $row = $query->row();
            $data = array(
                'status' => true,
                'user_id' => $row->user_id,
                'full_name' => $row->full_name
            );
        }else{
            $data = array(
                'status' => false,
                'user_id' => '',
                'full_name' => ''
            );
        }

        return $data;
    }

    //check if user exists by his email and password
    /**
     * @author: Abdulaziz Mohamed Alaa
     */
    public function check_user_email($email, $password){

        $this->db->select('user_id, full_name');
        $query = $this->db->get_where('users', array('email' => $email, 'password' => $password));

        if($query->num_rows() == 1){
            $row = $query->row();
            $data = array(
                'status' => true,
                'user_id' => $row->user_id,
                'full_name' => $row->full_name
            );
        }else{
            $data = array(
                'status' => false,
                'user_id' => '',
                'full_name' => ''
            );
        }

        return $data;
    }

    /**
     * @author: Abdulaziz Mohamed Alaa
     */
    public function user_exists($user_id){
        $this->db->where('user_id', $user_id);
        $query = $this->db->get('users');
        return ($query->num_rows() > 0 )?true:false;
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
    public function is_authorized($user_id, $project_id){
          $this->db->where(array('user_id' => $user_id,
                                 'project_assigned' => $project_id
          ));
          $query = $this->db->get('contributor');
          if($query->num_rows() == 1)
               return true;
          else
               return false;
    }
}
