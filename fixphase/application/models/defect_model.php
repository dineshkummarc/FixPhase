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
          if($result->num_rows() == 1)
               return (int) $result->result()[0]->related_project_id;
          else
               return false;
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
     public function search($severity, $priority, $status){
          $params = array('severity' => $severity, 'priority' => $priority, 'status' => $status);
          if(! $severity)
               unset($params['severity']);
          if (! $priority)
               unset($params['priority']);
          if (! $status)
               unset($params['status']);
          $this->db->where($params);
          $query = $this->db->get('defect');
          if($query->num_rows()>0)
               return $query->result();
          else
               return false;

     }
     public function unit_tests(){
          $this->load->library('unit_test');
          $this->unit->run($this->retrieveAll(2), 'is_array', 'Retrieve all defects of a given project');
          $this->unit->run($this->retrieveAll(912), false, 'Retrieve all defects of a given project');
          $this->unit->run($this->retrieve(1), 'is_object', 'Retrieve a certain defect');
          $this->unit->run($this->retrieve(502), false, 'Retrieve a certain defect');
          $this->unit->run($this->get_project(2), 'is_int', 'Retrieve project ID of a defect');
          $this->unit->run($this->get_project(333), false, 'Retrieve project ID of a defect');
          echo $this->unit->report();
     }

}
