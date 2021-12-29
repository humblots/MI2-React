import React from 'react'
import { Stack } from 'react-bootstrap'
import MusicianItem from './MusicianItem'


export default function MusiciansList(props) {
    return (
        <Stack direction="horizontal" gap={5} className="col-sm-12 justify-content-center flex-wrap">
            {
                props.musicians.map((m, key) => {
                    return <MusicianItem key={key} onClick={props.onItemClick} musician={m} />
                })
            }
        </Stack>
    )
}
