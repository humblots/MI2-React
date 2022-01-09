import React from 'react'
import { Navbar as BNavbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function Navbar(props) {
    return (
        <BNavbar expand="lg">
            <BNavbar.Brand id="logo" as={NavLink} to="/">
                MI2-Annuaire
            </BNavbar.Brand>
            <BNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BNavbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-end" style={{ width: "100%" }}>
                    <Nav.Link className="nav-item" as={NavLink} to="/musicians">Musiciens</Nav.Link>
                    <Nav.Link className="nav-item" as={NavLink} to="/groups">Groupes</Nav.Link>
                    <Nav.Link className="nav-item" as={NavLink} to="/login">
                        {props.user !== "" ? props.user : "Connexion"}
                    </Nav.Link>
                </Nav>
            </BNavbar.Collapse>
        </BNavbar>
    )
}
