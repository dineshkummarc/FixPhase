<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class project_model extends CI_Model{


    public function insert_project($pname, $desc, $user_id){
        $data = array(
            'project_name' => $pname,
            'description' => $desc,
            'created_by' => $user_id
        );

        if($this->db->insert('project', $data) > 0){
            $project_id = $this->db->insert_id();
            if($this->insert_contributor($user_id, $project_id, -1))
            {
                return $project_id;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    //get all projects in database
    //with
    //offset $offset
    //limit $limit
    public function get_all_user_projects($user_id, $offset, $limit){
        //$this->db->select('project.project_id as id, project.project_name as name, project.created_by as owner, users.username, contributor.role, contributor.date_assigned');
        $this->db->select('project.project_id as id, project.project_name as name, project.created_by as owner');
        $this->db->from('project');
        $this->db->join('contributor', 'contributor.project_assigned = project.project_id');
        $this->db->join('users', 'users.user_id = project.created_by');
        $this->db->where('contributor.user_id', $user_id);
        $query = $this->db->get();
        if($query->num_rows() > 0){
            return $query->result();
        }else{
            return false;
        }

    }
    //get all projects in database
    //with
    //offset $offset
    //limit $limit
    public function get_all_projects($offset, $limit){
        $this->db->select('project_id as id, project_name as name, created_by as owner');
        $query = $this->db->get("project", $offset, $limit);
        if($query->num_rows() > 0){
            return $query->result();
        }else {
            return false;
        }
    }

    //get the data of a specific project with project_id = $id
    public function get_project($project_id){
        //leave until the database is updated with new attributes for the project data
        $this->db->select('project_id as id, project_name as name, created_by as owner');
        $this->db->where('project_id', $project_id);
        $query = $this->db->get("project");
        if($query->num_rows() > 0){
            return $query->row();
        }else{
            return false;
        }
    }

    //get the data of a specific project with project_id = $id
    public function get_project_info($project_id){
        //leave until the database is updated with new attributes for the project data
        $this->db->where('project_id', $project_id);
        $query = $this->db->get("project");
        if($query->num_rows() > 0){
            return $query->row();
        }else{
            return false;
        }
    }

    //get all contributors in a project
    public function get_contributors($project_id){
        $this->db->select('users.user_id, users.username');
        $this->db->from('users');
        $this->db->join('contributor', 'contributor.user_id = users.user_id');
        $this->db->where('contributor.project_assigned', $project_id);
        $query = $this->db->get();

        if($query->num_rows() > 0){
            return $query->result();
        }else{
            return false;
        }
    }

    public function get_bugs_count($project_id, $status){
        $this->db->select('defect_id');
        $this->db->where('related_project_id', $project_id);

        if($status == '')
            $this->db->like('status', '');
        else
            $this->db->where('status', $status);

        $query = $this->db->get('defect');
        return $query->num_rows();
    }

    public function project_exists($project_id){
        $project = $this->get_project($project_id);
        return $project==false?false:true;
    }

    public function insert_contributor($user_id, $project_id, $role){
        $data = array(
            'user_id' => $user_id,
            'project_assigned' => $project_id,
            'role' => $role
        );
        $num = $this->db->insert('contributor', $data);

        return ($num > 0)?true:false;
    }

    public function is_contributor($user_id, $project_id){
        $this->db->where('user_id', $user_id);
        $this->db->where('project_assigned', $project_id);
        $query = $this->db->get('contributor');
        return ($query->num_rows() > 0)?true:false;
    }

    public function is_owner($user_id, $project_id){
        $this->db->where('created_by', $user_id);
        $this->db->where('project_id', $project_id);
        $query = $this->db->get('project');
        return ($query->num_rows() > 0)?true:false;
    }


    public function has_auth($user_id, $project_id){
        if($this->is_contributor($user_id, $project_id)){
            return true;
        }else{
            return false;
        }
    }

}
