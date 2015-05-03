<?php
/**
 * Created by PhpStorm.
 * User: karim
 * Date: 5/1/15
 * Time: 12:22 AM
 */
defined('BASEPATH') OR exit('No direct script access allowed');
class Todoapp extends CI_Controller{
    public function index()
    {
        $this->load->view('example/todo_view.html');
    }


}