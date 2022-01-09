import React from 'react'
import {Stack} from 'react-bootstrap';
import axios from "axios";

export default function GroupItem(props) {
    let {name, description, img, id} = props.group;
    if (img === '') img = 'logo512.png';

    // Envoie le groupe à éditer au Modal d'edit contenu dans GroupsList
    let handleEdit = function (e) {
        e.stopPropagation();
        props.onEditClick(props.group);
    }

    // Envoie une requête GET pour supprimer le groupe puis met à jour la vue
    let handleDelete = function (e) {
        e.stopPropagation();
        if (!window.confirm("Supprimer le groupe ?")) {
            return;
        }
        let url = "http://localhost:5000/api/groups.php"
        axios.get(url,
            {"params": {"action": "delete", "id": id}}
        ).then((res) => {
            props.updateList(res.data);
        }).catch(e => {
        })
    }

    return (
        <div className="card-item" onClick={() => props.onClick(props.group)}>
            <img className="card-item-img" src={img} alt={name}/>
            <div className="card-item-div">
                <div className="card-item-div">
                    <div className="card-item-body">
                        <p className="card-item-name pb-2">{name}</p>
                        <p className="card-item-desc">{description}</p>
                    </div>
                    {
                        props.user === "admin"
                            ? <Stack direction="horizontal" gap={1} className="action-icons">
                                <img className="trash-icon" src={"images/trash-32.png"} alt={"trash"} title={"trash"}
                                     onClick={(e) => handleDelete(e)}/>
                                <img className="edit-icon" src={"images/edit-32.png"} alt={"edit"}
                                     onClick={(e) => handleEdit(e)}/>
                            </Stack>
                            : ""
                    }
                </div>
            </div>
        </div>
    )
}

