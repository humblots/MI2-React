<?php
$data = file_get_contents("./data/groups.json");
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');
echo $data;
