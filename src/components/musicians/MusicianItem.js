import React from 'react'

export default function MusicianItem(props) {
    let { name, speciality, img } = props.musician;
    let onClick = props.onClick;
    if (img === '') img = 'logo512.png';
    return (
        <div className="card-item" onClick={() => onClick(props.musician)}>
            <img className="card-item-img" src={img} alt={name} />
            <div className="card-item-div">
                <p className="card-item-name">{name}</p>
                <p className="card-item-spe">{speciality}</p>
            </div>
        </div>
    )
}
