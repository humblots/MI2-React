import React from 'react'
import {Button, Form} from 'react-bootstrap'
import axios from 'axios'

export default function GroupForm(props) {

    let musicians = props.musicians;

    // définit des variables si un groupe est passé en paramètre
    if (props.group !== undefined) {
        var {id, name, description, img} = props.group;
    }

    /**
     * Envoie une requete POST pour ajouter/modifier un groupe
     * Puis met à jour la vue
     * @param {Object} e Event
     */
    let handleSubmit = function (e) {
        e.preventDefault();
        let data = new FormData(),
            action = "add",
            group = {
                "name": e.target.elements.name.value,
                "description": e.target.elements.description.value,
                "img": e.target.elements.img.value
            },
            musiciansOptions = Array.from(e.target.elements.musicians.selectedOptions);
        group.musicians = musiciansOptions.map((option) => {
            return parseInt(option.value)
        });

        if (id !== undefined) {
            group.id = id;
            action = "update";
        }

        data.append('action', action);
        data.append('group', JSON.stringify(group));

        axios({
            "method": 'post',
            "url": 'http://localhost:5000/api/groups.php',
            "data": data
        }).then((res) => {
            props.updateList(res.data);
        })
    }

    return (
        <Form
            className={props.className}
            onSubmit={(e) => {
                handleSubmit(e)
            }}
        >
            <div className="row justify-content-center ml-2 mr-2">
                <div className="col-sm-10 col-lg-2" title="Nom du groupe">
                    <Form.Control required id="name" defaultValue={name} placeholder="Nom du groupe"/>
                </div>
                <div className="col-sm-10 col-lg-3" title="Description">
                    <Form.Control required id="description" defaultValue={description} placeholder="Description"/>
                </div>
                <div className="col-sm-10 col-lg-3" title="Image URL">
                    <Form.Control id="img" defaultValue={img} placeholder="Image"/>
                </div>
                {
                    musicians !== undefined
                        ? <div className="col-sm-10 col-lg-2">
                            <Form.Select id="musicians" defaultValue={musicians} multiple aria-label="Musiciens">
                                {musicians.map(musician => (
                                    <option key={musician.id} value={musician.id} title={musician.name}>
                                        {musician.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                        : ''
                }
                <div className="text-center col-sm-10 col-lg-1">
                    <Button type="submit"
                            title={id !== undefined ? "Éditer" : "Ajouter"}>
                        {id !== undefined ? "Éditer" : "Ajouter"}
                    </Button>
                </div>
            </div>
        </Form>
    )
}
