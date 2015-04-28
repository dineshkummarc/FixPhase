<?php
//SKELETON CODE FOR THE NON EXISTENT TABLE COMMENTS

class Comments extends CI_Model{
     public function retrieve_comment($id){  //Retrieve a certain comment
          $this->db->where(array('comment_id' => $id));
          $result = $this->db->get('comments');
          if($result->num_rows > 0)
               return $result->result();
          else
               return false;
     }
     public function retrieve_project_comments($pid){ //Could be useless, Retrieve all comments of a single project
          $this->db->where(array('project_id' => $pid));
          $result = $this->db->get('comments');
          if($result->num_rows > 0)
               return $result->result();
          else
               return false;
     }
     public function retrieve_defect_comments($did){  //Retrieve all comments of a certain defect
          $this->db->where(array('defect_id' => $did));
          $result = $this->db->get('comments');
          if($result->num_rows > 0)
               return $result->result();
          else
               return false;
     }
     public function insert($data){
          $this->db->insert('comments', $data);
     }
     public function update($data, $where){
          $this->db->where('comment_id' => $where);
          $this->db->update('comments', $data);
     }
     public function delete($data){
          $this->db->delete('comments', $data);
     }
}
?>
