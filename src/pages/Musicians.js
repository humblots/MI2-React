import React, { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import axios from 'axios';

// components import
import MusicianForm from '../components/musicians/MusicianForm';
import MusiciansList from '../components/musicians/MusiciansList';

export default function Musicians() {

    // states used to rerender the view 
    const [musicians, setMusicians] = useState();
    const [loading, setLoading] = useState(false)

    /**
     * fetch the musicians list from the php server
     */
    let fetchMusicians = function () {
        setLoading(true);
        axios.get('http://localhost:5000/api/musicians.php',
            { "params": { "action": "get" } }
        ).then((res) => {
            setMusicians(res.data);
            setLoading(false);
        }).catch(e => {
            setLoading(false);
        })
    }

    // fetchMusicians on page first load
    useEffect(() => {
        fetchMusicians();
    }, [])

    return (
        <div>
            <MusicianForm className="mb-5" updateList={(m) => { setMusicians(m) }} />
            {
                loading
                    ? <div className="vertical-center">
                        <Spinner className="loading" animation="grow" />
                    </div>
                    : musicians === undefined
                        ? <div className="vertical-center">
                            <p className="text-center">Erreur lors de la recuperation</p>
                        </div>
                        : musicians.length !== 0
                            ? <MusiciansList
                                musicians={musicians}
                                context={"musicians"}
                                updateList={(m) => { setMusicians(m) }}
                            />
                            : <div className="vertical-center">
                                <p className="text-center">Aucun musicien repertorie</p>
                            </div>
            }
        </div>
    )
}
