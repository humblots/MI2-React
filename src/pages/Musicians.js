import React, { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import axios from 'axios';

// components import
import CModal from '../components/CModal';
import MusicianForm from '../components/musicians/MusicianForm';
import MusiciansList from '../components/musicians/MusiciansList';

export default function Musicians() {

    // states used to rerender the view 
    const [musicians, setMusicians] = useState();
    const [loading, setLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [musician, setMusician] = useState({});

    /**
     * fetch the musicians list from the php server
     */
    let fetchMusicians = function () {
        setLoading(true);
        axios.get('http://localhost:5000/api/getMusicians.php')
            .then((res) => {
                setMusicians(res.data);
                setLoading(false);
            }).catch(e => {
                setLoading(false);
            })
    }

    /**
     * callback for MusicianItems
     * Set the musician and modal state 
     * to display a modal containing the musician infos 
     * @param {Object} m Musician object
     */
    let handleClick = function (m) {
        setMusician(m);
        setModalShow(true);
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
                            ? <MusiciansList musicians={musicians} onItemClick={(m) => { handleClick(m) }} />
                            : <div className="vertical-center">
                                <p className="text-center">Aucun musicien repertorie</p>
                            </div>
            }
            {
                musician !== undefined
                    ? <CModal show={modalShow}
                        onHide={() => setModalShow(false)}
                        title={musician.name + " - " + musician.speciality}
                        body={<img className="img-fluid" src={musician.img} alt={musician.name} />} />
                    : ''
            }
        </div>
    )
}
