<?php

header('Access-Control-Allow-Origin: *');

$body = file_get_contents('php://input');

if (empty($body)) {
    return;
}

$group = json_decode($body);
$data = file_get_contents('./data/groups.json');
$data = json_decode($data);
$data[] = $group;
$data = json_encode($data);
file_put_contents('./data/groups.json', $data);
echo $data;