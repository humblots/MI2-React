import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Form, Spinner, Stack } from 'react-bootstrap';
import GroupForm from '../components/groups/GroupForm';
import GroupsList from '../components/groups/GroupsList';

export default function Groups() {

    const [loading, setLoading] = useState(false);
    const [musicians, setMusicians] = useState();
    const [groups, setGroups] = useState();

    let fetchGroups = function () {
        setLoading(true);
        axios.get(
            "http://localhost:5000/api/groups.php",
            { "params": { "action": "get" } }
        ).then(res => {
            setGroups(res.data);
            setLoading(false);
        }).catch(e => {
            setLoading(false);
        });
    }

    let fetchMusicians = function () {
        setLoading(true);
        axios.get('http://localhost:5000/api/musicians.php',
            { "params": { "action": "get" } }
        ).then((res) => {
            setMusicians(res.data);
        }).catch(e => {
        })
    }

    useEffect(() => {
        fetchGroups();
        fetchMusicians();
    }, [])


    return (
        <div>
            <GroupForm className="mb-5" musicians={musicians} updateList={(g) => { setGroups(g) }} />
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
                                <GroupsList groups={groups} updateList={(g) => { setGroups(g) }} />
                            </>
                            :
                            <div className="vertical-center">
                                <p className="text-center">Aucun groupe repertorie</p>
                            </div>
            }
        </div>
    )
}
