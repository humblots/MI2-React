import React from 'react'
import {Button, Form} from 'react-bootstrap'
import axios from 'axios'

export default function MusicianForm(props) {
    if (props.musician !== undefined) {
        var {id, name, speciality, img} = props.musician;
    }

    // Liste des spécialités de la dropdown select
    let specialities = [
        "Accordéoniste", "Altiste", "Balafoniste", "Bassiste", "Bassoniste", "Batteur", "Carillonneur", "Chanteur",
        "Cithariste", "Clarinettiste", "Claveciniste", "Claviériste", "Compositeur", "Contrebassiste", "Corniste",
        "Cymbaliste", "Dulcimeriste", "Flûtiste", "Flûtiste à bec", "Guitariste", "Harmoniciste", "Harmoniumiste",
        "Harpiste", "Hautboïste", "Koraïste", "Luthiste", "Mandoliniste", "Organiste", "Percussionniste", "Pianiste",
        "Rappeur", "Saxophoniste", "Sonneur", "Tromboniste", "Trompettiste", "Tubiste", "Vibraphoniste", "Vielleur",
        "Violiste", "Violoncelliste", "Violoniste"
    ];

    /**
     * Envoie une requête POST pour ajouter/modifier un musicien puis met à jour la vue
     * @param {Object} e Event
     */
    let handleSubmit = function (e) {
        e.preventDefault();

        let action = "add",
            musician = {
                "name": e.target.elements.name.value,
                "speciality": e.target.elements.speciality.value,
                "img": e.target.elements.img.value,
            };

        if (id !== undefined) {
            musician.id = id
            action = "update";
        }

        let data = new FormData();
        data.append('action', action);
        data.append('musician', JSON.stringify(musician));

        axios({
            "method": 'post',
            "url": 'http://localhost:5000/api/musicians.php',
            "data": data
        }).then((res) => {
            let musicians = [];
            if (props.musicians !== undefined) {
                for (let musician of res.data) {
                    for (let gMusician of props.musicians) {
                        if (musician.id === gMusician.id) {
                            musicians.push(musician);
                        }
                    }
                }
            } else {
                musicians = res.data;
            }
            props.updateList(musicians);
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
                <div className="col-sm-10 col-lg-4">
                    <Form.Control required id="name"
                                  placeholder="Nom de l'artiste"
                                  title="Nom de l'artiste"
                                  defaultValue={name}/>
                </div>
                <div className="col-sm-10 col-lg-3">
                    <Form.Select id="speciality" defaultValue={speciality}>
                        {specialities.map((spe, key) => (
                            <option key={key} value={spe} title={spe}>
                                {spe}
                            </option>
                        ))}
                    </Form.Select>
                </div>
                <div className="col-sm-10 col-lg-3">
                    <Form.Control id="img"
                                  placeholder="Image"
                                  title="Image URL"
                                  defaultValue={img}/>
                </div>
                <Button className="col-sm-6 col-lg-2"
                        type="submit"
                        title={id !== undefined ? "Éditer" : "Ajouter"}>
                    {id !== undefined ? "Éditer" : "Ajouter"}
                </Button>
            </div>
        </Form>
    )
}
