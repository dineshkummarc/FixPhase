<?php


  class project_model extends CI_Model{


    //get all projects in database
    //with
    //offset $offset
    //limit $limit
    public function get_all_projects($offset, $limit){
      $this->db->select('project_id, project_name');
      $query = $this->db->get("project", $offset, $limit);
      return $query->result();
    }

    //get the data of a specific project with project_id = $id
     public function get_project($id){
      //leave until the database is updated with new attributes for the project data
      //$this->db->select('project_id, project_name');
      $this->db->where('project_id', $id);
      $query = $this->db->get("project");
      return $query->result();
     }
     public function project_exists($id){
          $project = $this->get_project($id);
          if(isset($project[0]->project_id))
               return true;
          else
               return false;
     }

  }
