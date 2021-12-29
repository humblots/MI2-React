import React from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

export default function MusicianForm(props) {

    /**
     * Post the form content to the php server to save a new musician
     * Update the musicians list with the recently added musician
     * @param {Object} e Event
     */
    let handleSubmit = function (e) {
        e.preventDefault();

        let data = {
            "name": e.target.elements.name.value,
            "speciality": e.target.elements.speciality.value,
            "img": e.target.elements.img.value,
        };

        axios({
            "method": 'post',
            "url": 'http://localhost:5000/api/updateMusicians.php',
            "data": JSON.stringify(data)
        }).then((res) => {
            console.log(res);
            props.updateList(res.data);
        })
    }

    return (
        <Form
            className={props.className}
            onSubmit={(e) => { handleSubmit(e) }}
        >
            <div className="row justify-content-center ml-2 mr-2">
                <div className="col-sm-10 col-lg-4">
                    <Form.Control required id="name" placeholder="Nom de l'artiste" />
                </div>
                <div className="col-sm-10 col-lg-3">
                    <Form.Control required id="speciality" placeholder="Specialite" />
                </div>
                <div className="col-sm-10 col-lg-3">
                    <Form.Control id="img" placeholder="Image" />
                </div>
                <Button className="col-sm-6 col-lg-2" type="submit">Ajouter</Button>
            </div>
        </Form>
    )
}
