<?php

header("Access-Control-Allow-Origin: *");

if(isset($_GET['action'])) {
    if($_GET['action'] === 'get') {
        return get();
    }

    if($_GET['action'] === 'getByIds') {
        if(!isset($_GET['ids'])) {
            return;
        }
        return getByIds(json_decode($_GET['ids']));
    }

    if($_GET['action'] === 'delete') {
        if(!isset($_GET['id'])) {
            return;
        }
        return delete($_GET['id']);
    }
} else if(isset($_POST['action'])) {
    if(!isset($_POST['musician'])) {
        return;
    }

    if($_POST['action'] === 'add') {
        return add(json_decode($_POST['musician']));
    }

    if($_POST['action'] === 'update') {
        return update(json_decode($_POST['musician']));
    }
}

function get() {
    $data = file_get_contents('./data/musicians.json');
    echo $data;
}

function getByIds(array $ids) {
    $data = file_get_contents('./data/musicians.json');
    $data = json_decode($data);
    $musicians = [];
    foreach ($data as $m) {
        if (in_array($m->id, $ids)) {
            $musicians[] = $m;
        }
    }
    echo json_encode($musicians);
}


function add($musician) {
    
    // read musicians data
    $data = file_get_contents('./data/musicians.json');
    $data = json_decode($data);
    $musician = json_decode($_POST['musician']);
    
    // create a new id from the last musician id in data file
    // and set it to the musician before adding him to data file

    if(empty($data)) {
        $id=1;
    } else {
        $id = end($data)->id + 1;
    }
    $musician->id = $id;
    $data[] = $musician;
    
    // write the data and returns it
    $data = json_encode($data);
    file_put_contents('./data/musicians.json', $data);
    echo $data;
}

function update($musician) {
    $data = file_get_contents('./data/musicians.json');
    $data = json_decode($data);

    foreach($data as $key => $m) {
        if ($m->id === $musician->id) {
            $data[$key] = $musician;
            break;
        }
    }

    $data = json_encode($data);
    file_put_contents('./data/musicians.json', $data);
    echo $data;
}

function delete(int $id) {
    $data = file_get_contents('./data/musicians.json');
    $data = json_decode($data);

    foreach($data as $key => $m) {
        if ($m->id === $id) {
            unset($data[$key]);     
            $data = array_values($data);
            break;
        }
    }
    
    $data = json_encode($data);
    file_put_contents('./data/musicians.json', $data);

    $gData = file_get_contents('./data/groups.json');
    $gData = json_decode($gData);

    foreach ($gData as $group) {
        if (($key = array_search($id, $group->musicians)) !== false) {
            unset($group->musicians[$key]);
            $group->musicians = array_values($group->musicians);
        }
    }

    file_put_contents('./data/groups.json', json_encode($gData));

    echo $data;
}