<?php
/**
 * Created by PhpStorm.
 * User: karim
 * Date: 4/28/15
 * Time: 12:56 PM
 */
class Todo_model extends CI_Model{

    public function getAllTodo(){
        $query = $this->db->query("select id, title, body FROM todo");
        if ($query->num_rows() > 0)
        {
            return $query->result();
        }
        return NULL;
    }

    public function getTodo($id)
    {
        $query = $this->db->query("select id, title, body FROM todo where id = ? LIMIT `",$id);
        if ($query->num_rows() > 0)
        {
            return $query->result();
        }
        return NULL;

    }

    public function createTodo($title, $body)
    {
        $this->db->query("INSERT INTO todo VALUES (NULL,?,?)", $title, $body);
        return $this->db->affected_rows() > 0;
    }
}