<?php

header("Access-Control-Allow-Origin: *");

if(isset($_GET['action'])) {
    if($_GET['action'] === 'get') {
        return get();
    }

    if($_GET['action'] === 'delete') {
        if(!isset($_GET['id'])) {
            return;
        }
        return delete($_GET['id']);
    }
} else if(isset($_POST['action'])) {
    if(!isset($_POST['group'])) {
        return;
    }

    if($_POST['action'] === 'add') {
        return add(json_decode($_POST['group']));
    }

    if($_POST['action'] === 'update') {
        return update(json_decode($_POST['group']));
    }
}

function get() {
    $mData = json_decode(file_get_contents('./data/musicians.json'));
    $gData = json_decode(file_get_contents('./data/groups.json'));

    foreach($gData as $group) {
        $musicians = [];
        foreach ($mData as $m) {
            if(in_array($m->id, $group->musicians)) {
                $musicians[] = $m;
            }
        }
        $group->musicians = $musicians;
    }

    echo json_encode($gData);
}

function add($group) {
    
    // read groups data
    $data = json_decode(file_get_contents('./data/groups.json'));
    
    // create a new id from the last group id in data file
    // and set it to the group before adding him to data file

    if(empty($data)) {
        $id=1;
    } else {
        $id = end($data)->id + 1;
    }
    $group->id = $id;
    $data[] = $group;
    file_put_contents('./data/groups.json', json_encode($data));

    $mData = json_decode(file_get_contents('./data/musicians.json'));
    foreach($data as $group) {
        $musicians = [];
        foreach ($mData as $m) {
            if(in_array($m->id, $group->musicians)) {
                $musicians[] = $m;
            }
        }
        $group->musicians = $musicians;
    }

    // write the data and returns it
    echo json_encode($data);
}

function update($group) {
    $data = json_decode(file_get_contents('./data/groups.json'));
    foreach($data as $key => $g) {
        if ($g->id === $group->id) {
            $data[$key] = $group;
            break;
        }
    }
    file_put_contents('./data/groups.json', json_encode($data));

    $mData = json_decode(file_get_contents('./data/musicians.json'));
    foreach($data as $group) {
        $musicians = [];
        foreach ($mData as $key => $m) {
            if(in_array($m->id, $group->musicians)) {
                $musicians[] = $m;
            }
        }
        $group->musicians = $musicians;
    }    

    echo json_encode($data);
}

function delete(int $id) {
    $data = file_get_contents('./data/groups.json');
    $data = json_decode($data);

    foreach($data as $key => $g) {
        if ($g->id === $id) {
            unset($data[$key]);     
            $data = array_values($data);
            break;
        }
    }
    
    $data = json_encode($data);
    file_put_contents('./data/groups.json', $data);
    echo $data;
}