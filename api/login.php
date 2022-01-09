<?php

header("Access-Control-Allow-Origin: *");

$login_normal = "user";
$password_normal = "user";

$login_admin = "admin";
$password_admin = "admin";

if (isset($_SESSION['user'])){
    session_destroy();
    echo "test";
} else {
    if (isset($_POST['username']) && isset($_POST['password'])) {

        if ($_POST['username'] == $login_normal && $_POST['password'] == $password_normal) {
            session_start();
            $_SESSION['user'] = $login_normal;
            echo "user";
        } else if ($_POST['username'] == $login_admin && $_POST['password'] == $password_admin) {
            session_start();
            $_SESSION['user'] = $login_admin;
            echo "admin";
        } else {
            echo "";
        }
    }
}
?>
