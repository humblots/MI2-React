import axios from 'axios';
import React from 'react'
import {Button, Form} from 'react-bootstrap'

export default function Login(props) {

    // Logout
    let handleLogout = function (e) {
        e.preventDefault();
        axios({
            "method": 'post',
            "url": 'http://localhost:5000/api/login.php',
        }).then((res) => {
            props.onSubmit(res.data);
        }).catch(e => {
            window.alert("Erreur de communication avec le serveur.");
        })
    }

    // Envoie une requête POST avec les informations de connexion puis met à jour le state user
    // si les infos sont correctes
    let handleLogin = function (e) {
        e.preventDefault();
        let data = new FormData();
        data.append("username", e.target.elements.username.value);
        data.append("password", e.target.elements.password.value);

        axios({
            "method": 'post',
            "url": 'http://localhost:5000/api/login.php',
            "data": data
        }).then((res) => {
            if (res.data === "") {
                return window.alert("Nom d'utilisateur/Mot de passe incorrect.");
            }
            props.onSubmit(res.data);
        }).catch(e => {
            window.alert("Erreur de communication avec le serveur.");
        })
    }

    return (
        <>
            {
                props.user === ""
                    ? <Form
                        className="row align-items-center justify-content-center"
                        onSubmit={(e) => {
                            handleLogin(e)
                        }}
                    >
                        <Form.Group className="col-10 ">
                            <Form.Label>Nom d'utilisateur</Form.Label>
                            <Form.Control required id="username" placeholder="Nom d'utilisateur"/>
                        </Form.Group>
                        <Form.Group className="col-10 mb-3">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control required id="password" type="password" placeholder="Mot de passe"/>
                        </Form.Group>
                        <div className="text-center col-6">
                            <Button type="submit">
                                Se Connecter
                            </Button>
                        </div>
                    </Form>
                    : <div className="text-center">
                        <h1>{props.user}</h1>
                        <Button onClick={(e) => {
                            handleLogout(e)
                        }}>Déconnexion</Button>
                    </div>
            }
        </>
    )
}
