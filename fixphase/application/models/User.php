<?php

class User extends CI_Model{
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
		 echo "3aab 3alaak";
	 }
     	 else
		 {
			 echo "bdan naak";
		 }
	 
 } 
}
