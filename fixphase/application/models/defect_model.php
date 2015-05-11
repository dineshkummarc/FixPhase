<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class defect_model extends CI_Model{
     public function retrieveAll($id){ //RETRIEVE ALL DEFECTS FOR THE GIVEN PROJECT $id
          $this->db->where('related_project_id', $id);
          $results = $this->db->get('defect');
          if($results->num_rows() > 0)
               return $results->result();
          else
               return false;
     }
     public function retrieve($id){ //RETRIEVE DEFECT FOR THIS GIVEN $ID
          $this->db->where('defect_id', $id);
          $result = $this->db->get('defect')->result();
          if(isset($result[0]))
               return $result[0];
          else
               return false;
     }
     public function insert($data){
          $this->db->insert('defect', $data);
          return $this->db->insert_id();
     }
     public function get_project($id){
          $this->db->where(array('defect_id' => $id));
          $result = $this->db->get('defect');
          return $result->result()[0]->related_project_id;
     }
     public function update($data, $where){
          $this->db->where(array('defect_id' => $where));
          $this->db->update('defect', $data);
          return $this->db->affected_rows();
     }
     public function delete($id){
          $this->db->delete('defect', array('did' => $id));
          return $this->db->affected_rows();
     }
}
