import React, {useEffect, useState} from 'react'
import {Spinner} from 'react-bootstrap'
import axios from 'axios';

import MusicianForm from '../components/musicians/MusicianForm';
import MusiciansList from '../components/musicians/MusiciansList';

export default function Musicians(props) {

    const [musicians, setMusicians] = useState([]);
    const [loading, setLoading] = useState(false)

    // Lance le loading et récupère les musiciens puis met à jour la vue;
    let fetchMusicians = function () {
        setLoading(true);
        axios.get('http://localhost:5000/api/musicians.php',
            {"params": {"action": "get"}}
        ).then((res) => {
            handleMusiciansUpdate(res.data)
            setLoading(false);
        }).catch(e => {
            setMusicians(undefined);
            setLoading(false);
        })
    }

    // Fonction lancée par le formulaire lors d'un ajout / modification
    let handleMusiciansUpdate = function (m) {
        setMusicians(m.sort(function (a, b) {
            return a.name.toLowerCase() > b.name.toLowerCase();
        }));
    }

    // Lance la récupération des données de musiciens lors du premier chargement de la page
    useEffect(() => {
        fetchMusicians();
    }, [])

    return (
        <div>
            {
                props.user === "admin"
                    ? <MusicianForm className="mb-5" updateList={handleMusiciansUpdate}/>
                    : ""
            }
            {
                loading
                    ? <div className="vertical-center">
                        <Spinner className="loading" animation="grow"/>
                    </div>
                    : musicians === undefined
                        ? <div className="vertical-center">
                            <p className="text-center">Erreur lors de la recuperation</p>
                        </div>
                        : musicians.length !== 0
                            ? <MusiciansList
                                user={props.user}
                                musicians={musicians}
                                updateList={handleMusiciansUpdate}
                            />
                            : <div className="vertical-center">
                                <p className="text-center">Aucun musicien repertorie</p>
                            </div>
            }
        </div>
    )
}
