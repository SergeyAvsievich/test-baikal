<?php

class DB {
    private const USER = 'root';
    private const PASSWORD = 'root';
    private const DBNAME = 'baikal_test';
    private const HOST = 'localhost';

    private function connectToDB() {
        $user = self::USER;
        $password = self::PASSWORD;
        $db_name = self::DBNAME;
        $host = self::HOST;

        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $mysqli = new mysqli($host, $user, $password, $db_name);
        $mysqli->set_charset("utf8mb4");
        return $mysqli;
    }

    public function getNameAllCategory() {
        $mysqli = $this->connectToDB();
        $categories = $mysqli->query('SELECT * FROM `categories`');
        $cat = array();
        $obj = array();
    
        while($row = $categories->fetch_assoc()) {
            $obj['id'] = $row['id'];
            $obj['name'] = $row['name'];
            $obj['parentId'] = $row['parent_id'];
            $cat[] = $obj;
        }
    
        echo json_encode($cat, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }

    public function createCategory() {
        $mysqli = $this->connectToDB();
        $new_category = $_POST['newcategory'];
        $select_category = trim($_POST['select-category']);
        
        $mysqli->query("INSERT INTO `categories` (name, parent_id) VALUES ('".$new_category."','".$select_category."')");
    }

    public function createModel() {
        $mysqli = $this->connectToDB();

        $name = trim($_POST['name']);
        $category = trim($_POST['category']);

        echo var_dump($_FILES);

        if ($_FILES['img']['name'] !== '') {
            $file = $_FILES['img'];
            $nameImg = $file['name'];
            $pathFile = $_SERVER['DOCUMENT_ROOT'] .'/img/'.$nameImg;

            if (!move_uploaded_file($file['tmp_name'], $pathFile)){
                echo 'Файл не смог загрузиться';
            }

            $mysqli->query("INSERT INTO `models` (name, category_id, path) VALUES ('".$name."','".$category."','".$nameImg."')");
        }
    }

    public function getDataByCategory($category_name) {
        $mysqli = $this->connectToDB();
        $data = array();
        $details = array();
        $path = array();
        $names = array();

        $categories = $mysqli->query('SELECT * FROM `categories`');

        while($row = $categories->fetch_assoc()) {
            if ($category_name == $row['name']) {
                $parent_category = $row;
                $category_id = $row['id'];
                $title = $row['name'];
            }
        }

        if ($category_id) {
            $models = $mysqli->query('SELECT * FROM `models` WHERE category_id = '.$category_id.'');
        }
        
        if ($models) {
            while($row = $models->fetch_assoc()) {
                $details[] = $row;
            }
        }

        $data['details'] = $details;
        $data['title'] = $title;

        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }
}