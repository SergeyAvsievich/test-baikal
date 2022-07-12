<?php
    require_once "DB.php";
    $db = new DB();
    if ($_POST['getNameAllCategory']) $db->getNameAllCategory();
    if ($_POST['newcategory']){
        header('Location: /');
        $db->createCategory();
    }
    if ($_POST['newModel']) {
        header('Location: /');
        $db->createModel();
    }
    if ($_GET['getDataByCategory']) $db->getDataByCategory($_GET['categoryName']);