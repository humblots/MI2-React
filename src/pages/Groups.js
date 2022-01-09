import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import GroupForm from '../components/groups/GroupForm';
import GroupsList from '../components/groups/GroupsList';

export default function Groups(props) {

    const [loading, setLoading] = useState(false);
    const [musicians, setMusicians] = useState([]);
    const [groups, setGroups] = useState([]);

    // Lance le loading et récupère les groupes puis met à jour la vue;
    let fetchGroups = function () {
        setLoading(true);
        axios.get(
            "http://localhost:5000/api/groups.php",
            { "params": { "action": "get" } }
        ).then(res => {
            setGroups(res.data.sort((a, b) => {
                return a.name.toLowerCase() > b.name.toLowerCase();
            }));
            setLoading(false);
        }).catch(e => {
            setGroups(undefined);
            setLoading(false);
        });
    }

    // Lance le loading et récupère les musiciens pour le formulaire puis met à jour la vue;
    let fetchMusicians = function () {
        axios.get('http://localhost:5000/api/musicians.php',
            { "params": { "action": "get" } }
        ).then((res) => {
            setMusicians(res.data.sort(function (a, b) {
                return a.name.toLowerCase() > b.name.toLowerCase();
            }));
        })
    }

    // Fonction lancée par le formulaire lors d'un ajout / modification
    let handleGroupsUpdate = function (g) {
        setGroups(g.sort(function (a, b) {
            return a.name.toLowerCase() > b.name.toLowerCase();
        }));
    }

    // Lance les fonctions de récupération de données lors du premier chargement de la page
    useEffect(() => {
        fetchGroups();
        fetchMusicians();
    }, [])


    return (
        <div>
            {
                props.user === "admin"
                    ? <GroupForm className="mb-5" musicians={musicians} updateList={handleGroupsUpdate} />
                    : ""
            }
            {
                loading
                    ? <div className="vertical-center">
                        <Spinner className="loading" animation="grow" />
                    </div>
                    : groups === undefined
                        ? <div className="vertical-center">
                            <p className="text-center">Erreur lors de la recuperation</p>
                        </div>
                        : groups.length !== 0
                            ? <>
                                <GroupsList
                                    user={props.user}
                                    groups={groups}
                                    musicians={musicians}
                                    updateList={handleGroupsUpdate} />
                            </>
                            :
                            <div className="vertical-center">
                                <p className="text-center">Aucun groupe repertorie</p>
                            </div>
            }
        </div>
    )
}
