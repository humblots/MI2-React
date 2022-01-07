import React from 'react'
import { Stack } from 'react-bootstrap';
import axios from "axios";

export default function GroupItem(props) {
    let { name, description, img, id } = props.group;
    let onClick = props.onClick;
    if (img === '') img = 'logo512.png';

    let handleDelete = function () {
        let url = "http://localhost:5000/api/groups.php"
        axios.get(url,
            { "params": { "action": "delete", "id": id } }
        ).then((res) => {
            props.updateList(res.data);
        }).catch(e => {
        })
    }

    return (
        <div className="card-item">
            <img className="card-item-img" src={img} alt={name} onClick={() => onClick(props.group)} />
            <div className="card-item-div">
                <div className="card-item-div">
                    <p className="card-item-name pb-2">{name}</p>
                    <p className="card-item-desc">{description}</p>
                    <Stack direction="horizontal" gap={1} className="action-icons">
                        <img className="trash-icon" src={"images/trash-32.png"} alt={"trash"} onClick={() => handleDelete()} />
                        <img className="edit-icon" src={"images/edit-32.png"} alt={"edit"} onClick={() => props.onEditClick(props.group)} />
                    </Stack>
                </div>
            </div>
        </div>
    )
}

