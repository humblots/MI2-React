import React, { useState } from 'react'
import { Stack } from 'react-bootstrap'
import CModal from '../CModal';
import MusicianItem from './MusicianItem'
import MusicianForm from './MusicianForm'


export default function MusiciansList(props) {

    const [imageModalShow, setImageModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [musician, setMusician] = useState({});

    let handleClick = function (m) {
        setMusician(m);
        setImageModalShow(true);
    }

    let handleEditClick = function (m) {
        setMusician(m);
        setEditModalShow(true);
    }

    return (
        <>
            <Stack direction="horizontal" gap={5} className="col-sm-12 justify-content-center flex-wrap">
                {
                    props.musicians.map((m, key) => {
                        return <MusicianItem key={key}
                            context={props.context}
                            updateList={props.updateList}
                            onClick={(m) => { handleClick(m) }}
                            musician={m}
                            onEditClick={(m) => handleEditClick(m)} />
                    })
                }
            </Stack>
            {
                Object.keys(musician).length !== 0
                    ? <>
                        <CModal show={imageModalShow}
                            onHide={() => setImageModalShow(false)}
                            title={musician.name + " - " + musician.speciality}
                            body={<img className="img-fluid" src={musician.img} alt={musician.name} />}
                        />
                        <CModal show={editModalShow}
                            onHide={() => setEditModalShow(false)}
                            title={musician.name + " - " + musician.speciality}
                            body={
                                <MusicianForm
                                    musician={musician}
                                    updateList={(m) => { props.updateList(m) }}
                                />
                            }
                        />
                    </>
                    : ''
            }
        </>
    )
}
