<?php

header('Access-Control-Allow-Origin: *');

$body = file_get_contents('php://input');

if (empty($body)) {
    return;
}

$musician = json_decode($body);
$data = file_get_contents('./data/musicians.json');
$data = json_decode($data);
$data[] = $musician;
$data = json_encode($data);
file_put_contents('./data/musicians.json', $data);
echo $data;