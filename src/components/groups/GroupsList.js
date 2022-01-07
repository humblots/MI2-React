import axios from 'axios';
import React, { useState } from 'react'
import { Stack } from 'react-bootstrap'
import CModal from '../CModal';
import MusiciansList from '../musicians/MusiciansList';
import GroupForm from './GroupForm';
import GroupItem from './GroupItem';

export default function GroupsList(props) {
    const [group, setGroup] = useState({});
    const [imageModalShow, setImageModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    let handleClick = function (g) {
        setGroup(g);
        setImageModalShow(true);
    }

    let handleEditClick = function (g) {
        setGroup(g);
        setEditModalShow(true);
    }

    console.log(props.groups)

    return (
        <>
            <Stack direction="horizontal" gap={5} className="col-sm-12 justify-content-center flex-wrap">
                {
                    props.groups.map((g, key) => {
                        return <GroupItem key={key} updateList={props.updateList} onEditClick={handleEditClick} onClick={handleClick} group={g} />
                    })
                }
            </Stack>
            {
                Object.keys(group).length !== 0 ?
                    <>
                        <CModal show={imageModalShow}
                            onHide={() => setImageModalShow(false)}
                            title={
                                <>
                                    <p>{group.name}</p>
                                    <p>{group.description}</p>
                                </>
                            }
                            body={
                                <Stack direction="vertical">
                                    <img className="img-fluid text-center" src={group.img} alt={group.name} />
                                    <h2 className="text-center mt-4 mb-4">Musiciens du groupe</h2>
                                    <MusiciansList context={"groups"} musicians={group.musicians} />
                                </Stack>
                            } />
                        <CModal show={editModalShow}
                            onHide={() => setEditModalShow(false)}
                            title={
                                <>
                                    <p>{group.name}</p>
                                    <p>{group.description}</p>
                                </>
                            }
                            body={
                                <GroupForm
                                    group={group}
                                    musicians={group.musicians}
                                    updateList={props.updateList}
                                />
                            }
                        />
                    </>
                    : ''
            }
        </>
    )
}
