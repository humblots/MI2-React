import axios from 'axios';
import React from 'react'
import {Stack} from 'react-bootstrap';

export default function MusicianItem(props) {
    let {name, speciality, img, id} = props.musician;
    if (img === '') img = 'logo512.png';

    // Envoie le musicien à éditer au Modal d'edit contenu dans MusiciansList
    let handleEdit = function (e) {
        e.stopPropagation();
        props.onEditClick(props.musician);
    }

    // Envoie une requête GET pour supprimer le musicien puis met à jour la vue
    let handleDelete = function (e) {
        e.stopPropagation();

        let url = "http://localhost:5000/api/",
            params;

        if (props.groupId === undefined) {
            url += "musicians.php";
            params = {"action": "delete", "id": id};
            if (!window.confirm("Supprimer l'artiste ?")) {
                return;
            }
        } else {
            url += "groups.php";
            params = {"action": "deleteFromGroup", "id": props.groupId, "mId": id};
            if (!window.confirm("Retirer l'artiste du groupe ?")) {
                return;
            }
        }

        axios.get(url,
            {"params": params}
        ).then((res) => {
            props.updateList(res.data);
        })
    }

    return (
        <div className="card-item" onClick={() => props.onClick(props.musician)}>
            <img className="card-item-img" src={img} alt={name} title={name}/>
            <div className="card-item-div">
                <p className="card-item-name" title="nom">{name}</p>
                <p className="card-item-spe" title="specialité">{speciality}</p>
                {
                    props.user === "admin"
                        ? <Stack direction="horizontal" gap={1} className="action-icons">
                            <img className="trash-icon"
                                 src={"images/trash-32.png"}
                                 alt={"trash"}
                                 title={"trash"}
                                 onClick={(e) => handleDelete(e)}/>
                            <img className="edit-icon"
                                 src={"images/edit-32.png"}
                                 alt={"edit"}
                                 title={"edit"}
                                 onClick={(e) => handleEdit(e)}/>
                        </Stack>
                        : ""
                }
            </div>
        </div>
    )
}

