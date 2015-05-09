<?php
class Comments extends CI_Model{
     public function retrieve_comment($id){  //Retrieve a certain comment
          $this->db->where(array('comment_id' => $id));
          $result = $this->db->get('comment');
          if($result->num_rows() > 0)
               return $result->result();
          else
               return false;
     }
     public function retrieve_defect_comments($did){  //Retrieve all comments of a certain defect
          $this->db->where(array('defect_id' => $did));
          $result = $this->db->get('comment');
          if($result->num_rows() > 0)
               return $result->result();
          else
               return false;
     }
     public function insert($data){
          $this->db->insert('comment', $data);
     }
     public function update($data, $where){
          $this->db->where(array('comment_id' => $where));
          $this->db->update('comment', $data);
     }
     public function delete($data){
          $this->db->delete('comment', $data);
     }
}
?>
