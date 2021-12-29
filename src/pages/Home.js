import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default function Home() {
    return (
        <Row className="vertical-center">
            <Col sm={12} md={8}>
                <h1 id="hero-text" className="text-end">Annuaires de Musiciens</h1>
            </Col>
            <Col sm={12} md={4}>
                <img id="hero-img" src={"logo512.png"} alt={"musicians"}></img>
            </Col>
        </Row>
    )
}
