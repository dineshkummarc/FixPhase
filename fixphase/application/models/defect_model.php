<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class defect_model extends CI_Model{
     public function retrieveAll($id){ //RETRIEVE ALL DEFECTS FOR THE GIVEN PROJECT $id
          $this->db->where('related_project_id', $id);
          return $this->db->get('defect')->result();
     }
     public function retrieve($id){ //RETRIEVE DEFECT FOR THIS GIVEN $ID
          $this->db->where('defect_id', $id);
          return $this->db->get('defect')->result();
     }
     public function insert($data){
          $this->db->insert('defect', $data);
     }
}
