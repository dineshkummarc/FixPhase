<?php
/**
 * Created by PhpStorm.
 * User: karim
 * Date: 4/28/15
 * Time: 12:55 PM
 */
require_once APPPATH.'/libraries/REST_Controller.php';

class Todo extends REST_Controller{

    public function __construct(){
        parent::__construct();
        //edit the database configuration
        $config['hostname'] = 'localhost';
        $config['username'] = 'root';
        $config['password'] = 'root';
        $config['database'] = 'example_todo';
        $config['dbdriver'] = 'mysqli';
        $config['dbprefix'] = '';
        $config['pconnect'] = FALSE;
        $config['db_debug'] = TRUE;

        $this->load->model('example/todo_model', 'todo', $config);
    }
    public function index_get(){
        $id = $this->get('id');

        //if no id in request then we need to return all the items
        if($id == NULL)
        {
            $list = $this->todo->getAllTodo();
            //Check if nothing was found
            if($list == NULL)
            {
                $this->response(array("error"=>"Not found."));
            }

            $this->response($list);
        }
        //id exist return a single item
        else{
            $item = $this->todo->getAllTodo();
            //Check if nothing was found
            if($item == NULL)
            {
                $this->response(array("error"=> "Not found."));
            }

            $this->response($item);
        }

    }

    public function index_post(){
        $title = $this->post("title");
        $body = $this->post("body");

        if($title == NULL || $body == NULL) {
            $this->response(array("error" => "Arguments missing."));
            return;
        }

        $query = $this->todo->createTodo($title,$body);
        if(!$query)
        {
            $this->response(array("error" => "Failed to insert."));
        }
        else
        {
            $this->response(array(),201);
        }


    }


}