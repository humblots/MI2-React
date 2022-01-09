<?php

header("Access-Control-Allow-Origin: *");

//controller
if (isset($_GET['action'])) {
    if ($_GET['action'] === 'get') {
        return get();
    }

    if ($_GET['action'] === 'delete') {
        if (!isset($_GET['id'])) {
            return;
        }
        return delete($_GET['id']);
    }
} else if (isset($_POST['action'])) {
    if (!isset($_POST['musician'])) {
        return;
    }

    if ($_POST['action'] === 'add') {
        return add(json_decode($_POST['musician']));
    }

    if ($_POST['action'] === 'update') {
        return update(json_decode($_POST['musician']));
    }
}

/**
 * Retourne la liste des musiciens
 */
function get()
{
    $data = file_get_contents('./data/musicians.json');
    echo $data;
}

/**
 * Ajoute le musicien au fichier musicians.json
 * puis retourne la liste des musiciens
 * @param Object $musician
 */
function add($musician)
{
    $data = file_get_contents('./data/musicians.json');
    $data = json_decode($data);
    $musician = json_decode($_POST['musician']);

    // Crée un nouvelle id à partir de l'id du dernier musicien enregistré ou le définit à 1
    // puis applique l'id au musicien avant enregistrement
    if (empty($data)) {
        $id = 1;
    } else {
        $id = end($data)->id + 1;
    }
    $musician->id = $id;
    $data[] = $musician;

    $data = json_encode($data);
    file_put_contents('./data/musicians.json', $data);
    echo $data;
}

/**
 * Met à jour le musicien puis renvoie la liste des musiciens
 * @param Object $musician
 */
function update($musician)
{
    $data = file_get_contents('./data/musicians.json');
    $data = json_decode($data);

    foreach ($data as $key => $m) {
        if ($m->id === $musician->id) {
            $data[$key] = $musician;
            break;
        }
    }

    $data = json_encode($data);
    file_put_contents('./data/musicians.json', $data);
    echo $data;
}

/**
 * Supprime le musicien de la liste de musicien ainsi que des groupes auxquels il appartient
 * puis renvoie la liste des musiciens
 * @param int $id
 */
function delete(int $id)
{
    $data = file_get_contents('./data/musicians.json');
    $data = json_decode($data);

    foreach ($data as $key => $m) {
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
