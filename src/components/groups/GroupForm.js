import React from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

export default function GroupForm(props) {

    let musicians = props.musicians;
    console.log(props.musicians);
    if (props.group !== undefined) {
        var { id, name, description, img } = props.group;
    }

    /**
     * Post the form content to the php server to save a new group
     * Update the group list with the recently added group
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
        group.musicians = musiciansOptions.map((option) => { return option.value });

        if (id !== undefined) {
            group.id = id;
            action = "update";
        };

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
            onSubmit={(e) => { handleSubmit(e) }}
        >
            <div className="row justify-content-center ml-2 mr-2">
                <div className="col-sm-10 col-lg-2">
                    <Form.Control required id="name" defaultValue={name} placeholder="Nom du groupe" />
                </div>
                <div className="col-sm-10 col-lg-3">
                    <Form.Control required id="description" defaultValue={description} placeholder="Description" />
                </div>
                <div className="col-sm-10 col-lg-3">
                    <Form.Control id="img" defaultValue={img} placeholder="Image" />
                </div>
                {
                    musicians !== undefined
                        ? <div className="col-sm-10 col-lg-2">
                            <Form.Select id="musicians" defaultValue={musicians} multiple aria-label="Musiciens">
                                {musicians.map(musician => (
                                    <option key={musician.id} value={musician.id}>
                                        {musician.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                        : ''
                }
                <div className="text-center col-sm-10 col-lg-1">
                    <Button type="submit">Ajouter</Button>
                </div>
            </div>
        </Form>
    )
}
