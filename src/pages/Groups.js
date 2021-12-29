import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Spinner, Stack } from 'react-bootstrap';
import CModal from '../components/CModal';
import GroupForm from '../components/groups/GroupForm';
import GroupsList from '../components/groups/GroupsList';
import MusiciansList from '../components/musicians/MusiciansList';

export default function Groups() {

    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState({});

    let fetchGroups = function () {
        setLoading(true);
        axios({
            "method": 'get',
            "url": 'http://localhost:5000/api/getGroups.php'
        }).then((res) => {
            setGroups(res.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        })
    }

    let handleClick = function (g) {
        setGroup(g);
        setModalShow(true);
    }

    useEffect(() => {
        fetchGroups();
    }, [])


    return (
        <div>
            <GroupForm className="mb-5" updateList={(g) => { setGroups(g) }} />
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
                                <GroupsList groups={groups} onItemClick={(m) => { handleClick(m) }} />
                            </>
                            :
                            <div className="vertical-center">
                                <p className="text-center">Aucun groupe repertorie</p>
                            </div>
            }
            {
                group !== undefined
                    ? <CModal show={modalShow}
                        onHide={() => setModalShow(false)}
                        title={
                            <>
                                <p>{group.name}</p>
                                <p>{group.description}</p>
                            </>
                        }
                        body={
                            <>
                                <Stack direction="vertical">
                                    <img className="img-fluid text-center" src={group.img} alt={group.name} />
                                    <h2 className="text-center mt-4 mb-4">Musiciens du groupe</h2>
                                    <MusiciansList musicians={group.musicians} />
                                </Stack>

                            </>
                        } />
                    : ''
            }
        </div>
    )
}
