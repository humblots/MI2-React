import React from 'react'
import { Stack } from 'react-bootstrap'
import GroupItem from './GroupItem';

export default function GroupsList(props) {
    let onClick = props.onClick;
    return (
        <Stack direction="horizontal" gap={5} className="col-sm-12 justify-content-center flex-wrap">
            {
                props.groups.map((g, key) => {
                    return <GroupItem key={key} onClick={props.onItemClick} group={g} />
                })
            }
        </Stack>
    )
}
