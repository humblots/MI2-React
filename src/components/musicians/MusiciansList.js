import React, {useState} from 'react'
import {Stack} from 'react-bootstrap'
import CModal from '../CModal';
import MusicianItem from './MusicianItem'
import MusicianForm from './MusicianForm'


export default function MusiciansList(props) {

    const [imageModalShow, setImageModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [musician, setMusician] = useState({});

    // Fonction lancé par MusicianItem pour ouvrir le modal du musicien
    let handleImageClick = function (m) {
        setMusician(m);
        setImageModalShow(true);
    }

    // Fonction lancé par MusicianItem pour ouvrir le modal d'edit du musicien
    let handleEditClick = function (m) {
        setMusician(m);
        setEditModalShow(true);
    }

    return (
        <>
            <Stack direction="horizontal" gap={5} className="col-sm-12 justify-content-center flex-wrap">
                {
                    props.musicians.map((m, key) => {
                        return <MusicianItem user={props.user}
                                             key={key}
                                             groupId={props.groupId}
                                             updateList={props.updateList}
                                             onClick={handleImageClick}
                                             musician={m}
                                             onEditClick={handleEditClick}/>
                    })
                }
            </Stack>
            {
                Object.keys(musician).length !== 0
                    ? <>
                        <CModal show={imageModalShow}
                                onHide={() => setImageModalShow(false)}
                                title={<h1>{musician.name + " - " + musician.speciality}</h1>}
                                body={<img className="img-fluid" src={musician.img} alt={musician.name}/>}
                        />
                        <CModal show={editModalShow}
                                onHide={() => setEditModalShow(false)}
                                title={musician.name + " - " + musician.speciality}
                                body={
                                    <MusicianForm
                                        musician={musician}
                                        updateList={props.updateList}
                                        musicians={props.musicians}
                                    />
                                }
                        />
                    </>
                    : ''
            }
        </>
    )
}
