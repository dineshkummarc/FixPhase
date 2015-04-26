<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class reference_model extends CI_Model{
     public function insert($data){
          $this->db->insert('reference', $data);
          return $this->db->insert_id();
     }
}
?>
