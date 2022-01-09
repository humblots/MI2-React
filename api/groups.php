<?php

header("Access-Control-Allow-Origin: *");

// controlleur
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

    if ($_GET['action'] === 'deleteFromGroup') {
        if (!(isset($_GET['id']) && isset($_GET['mId']))) {
            return;
        }
        return deleteFromGroup($_GET['id'], $_GET['mId']);
    }
} else if (isset($_POST['action'])) {
    if (!isset($_POST['group'])) {
        return;
    }

    if ($_POST['action'] === 'add') {
        return add(json_decode($_POST['group']));
    }

    if ($_POST['action'] === 'update') {
        return update(json_decode($_POST['group']));
    }
}

/**
 * Retourne l'intégralité des groupes
 */
function get()
{
    $mData = json_decode(file_get_contents('./data/musicians.json'));
    $gData = json_decode(file_get_contents('./data/groups.json'));

    // Change les ids des musiciens par leurs données récupérées depuis musicians.json
    foreach ($gData as $group) {
        $musicians = [];
        foreach ($mData as $m) {
            if (in_array($m->id, $group->musicians)) {
                $musicians[] = $m;
            }
        }
        $group->musicians = $musicians;
    }

    echo json_encode($gData);
}

/**
 * Ajoute le groupe au fichier groups.json
 * puis retourne l'intégralité des groupes
 * @param Object $group
 */
function add($group)
{
    $data = json_decode(file_get_contents('./data/groups.json'));

    // Crée un nouvelle id à partir de l'id du dernier groupe enregistré ou le définit à 1
    // puis applique l'id au groupe avant enregistrement
    if (empty($data)) {
        $id = 1;
    } else {
        $id = end($data)->id + 1;
    }
    $group->id = $id;
    $data[] = $group;
    file_put_contents('./data/groups.json', json_encode($data));

    // Change les ids des musiciens par leurs données récupérées depuis musicians.json
    $mData = json_decode(file_get_contents('./data/musicians.json'));
    foreach ($data as $group) {
        $musicians = [];
        foreach ($mData as $m) {
            if (in_array($m->id, $group->musicians)) {
                $musicians[] = $m;
            }
        }
        $group->musicians = $musicians;
    }

    echo json_encode($data);
}

/**
 * Modifie le groupe dans groups.json
 * puis retourne l'intégralité des groupes
 * @param Object $group
 */
function update($group)
{
    $data = json_decode(file_get_contents('./data/groups.json'));
    $key = array_search($group->id, array_column($data, 'id'));
    $data[$key] = $group;

    file_put_contents('./data/groups.json', json_encode($data));

    // Change les ids des musiciens par leurs données récupérées depuis musicians.json
    $mData = json_decode(file_get_contents('./data/musicians.json'));
    foreach ($data as $group) {
        $musicians = [];
        foreach ($mData as $key => $m) {
            if (in_array($m->id, $group->musicians)) {
                $musicians[] = $m;
            }
        }
        $group->musicians = $musicians;
    }

    echo json_encode($data);
}

/**
 * Supprime le groupe et renvoie l'intégralité des groupes
 * @param int $id id du groupe
 */
function delete(int $id)
{
    $data = file_get_contents('./data/groups.json');
    $data = json_decode($data);

    $key = array_search($id, array_column($data, 'id'));
    unset($data[$key]);
    $data = array_values($data);

    $data = json_encode($data);
    file_put_contents('./data/groups.json', $data);
    echo $data;
}

/**
 * Retire le musicien du groupe puis renvoie l'intégralité des musiciens restant du groupe
 * @param int $id id du groupe auquel retirer le musicien
 * @param int $mId id du musicien à retirer
 */
function deleteFromGroup(int $id, int $mId)
{
    $data = json_decode(file_get_contents('./data/groups.json'));
    $mData = json_decode(file_get_contents('./data/musicians.json'));

    $gKey = array_search($id, array_column($data, 'id'));
    $musicians = [];
    // Supprime le musicien d'id $mId et ajoute les autres au tableau $musicians
    foreach ($data[$gKey]->musicians as $key => $id) {
        if ($id === $mId) {
            unset($data[$gKey]->musicians[$key]);
            $data[$gKey]->musicians = array_values($data[$gKey]->musicians);
            continue;
        }
        $mKey = array_search($id, array_column($mData, 'id'));
        $musicians[] = $mData[$mKey];
    }

    file_put_contents('./data/groups.json', json_encode($data));
    echo json_encode($musicians);
}
