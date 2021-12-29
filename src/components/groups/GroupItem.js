import React from 'react'

export default function GroupItem(props) {
    let { name, img } = props.group;
    let onClick = props.onClick;
    if (img === '') img = 'logo512.png';
    return (
        <div className="card-item" onClick={() => onClick(props.group)}>
            <img className="card-item-img" src={img} alt={name} />
            <div className="card-item-div">
                <p className="card-item-name pb-2">{name}</p>
            </div>
        </div>
    )
}

