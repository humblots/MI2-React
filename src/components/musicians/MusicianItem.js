import axios from 'axios';
import React from 'react'
import { Stack } from 'react-bootstrap';

export default function MusicianItem(props) {
    let { name, speciality, img, id } = props.musician;
    if (img === '') img = 'logo512.png';

    let handleDelete = function () {
        let url = "http://localhost:5000/api/" +
            (props.context === "musicians"
                ? "musicians.php"
                : "groups.php");
        axios.get(url,
            { "params": { "action": "delete", "id": id } }
        ).then((res) => {
            props.updateList(res.data);
        }).catch(e => {
        })
    }

    return (
        <div className="card-item">
            <img className="card-item-img" src={img} alt={name} onClick={() => props.onClick(props.musician)} />
            <div className="card-item-div">
                <p className="card-item-name">{name}</p>
                <p className="card-item-spe">{speciality}</p>
                <Stack direction="horizontal" gap={1} className="action-icons">
                    <img className="trash-icon" src={"images/trash-32.png"} alt={"trash"} onClick={() => handleDelete()} />
                    <img className="edit-icon" src={"images/edit-32.png"} alt={"edit"} onClick={() => { props.onEditClick(props.musician) }} />
                </Stack>
            </div>
        </div >
    )
}

