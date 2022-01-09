import React, {useState} from 'react'
import {Stack} from 'react-bootstrap'
import CModal from '../CModal';
import MusiciansList from '../musicians/MusiciansList';
import GroupForm from './GroupForm';
import GroupItem from './GroupItem';

export default function GroupsList(props) {
    const [group, setGroup] = useState({});
    const [gMusicians, setgMusicians] = useState([]);
    const [imageModalShow, setImageModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    // Fonction lancé par GroupItem pour ouvrir le modal du groupe
    let handleImageClick = function (g) {
        setGroup(g);
        setgMusicians(g.musicians);
        setImageModalShow(true);
    }

    // Fonction lancé par GroupItem pour ouvrir le modal d'édition du groupe
    let handleEditClick = function (g) {
        setGroup(g);
        setEditModalShow(true);
    }

    // Fonction permettant de mettre à jour la liste de musicians du groupe affiché dans le modal
    // PS: N'A PAS L'AIR DE VOULOIR FONCTIONNER
    let updateMusiciansList = function (m) {
        setgMusicians(m);
    }

    return (
        <>
            <Stack direction="horizontal" gap={5} className="col-sm-12 justify-content-center flex-wrap">
                {
                    props.groups.map((g, key) => {
                        return <GroupItem user={props.user}
                                          key={key}
                                          updateList={props.updateList}
                                          onEditClick={handleEditClick}
                                          onClick={handleImageClick}
                                          group={g}/>
                    })
                }
            </Stack>
            {
                Object.keys(group).length !== 0 ?
                    <>
                        <CModal show={imageModalShow}
                                onHide={() => setImageModalShow(false)}
                                title={
                                    <h1 title={group.name}>{group.name}</h1>
                                }
                                body={
                                    <Stack direction="vertical">
                                        <p title="Description">{group.description}</p>
                                        <img className="img-fluid text-center" src={group.img} alt={group.name}
                                             title={group.name}/>
                                        {
                                            gMusicians.length !== 0
                                                ? <>
                                                    <h2 className="text-center mt-4 mb-4" title="Musiciens">Musiciens du
                                                        groupe</h2>
                                                    <MusiciansList user={props.user}
                                                                   groupId={group.id}
                                                                   musicians={gMusicians.sort((a, b) => {
                                                                       return a.name.toLowerCase() > b.name.toLowerCase();
                                                                   })}
                                                                   updateList={updateMusiciansList}/>
                                                </>
                                                : ""
                                        }

                                    </Stack>
                                }/>
                        <CModal show={editModalShow}
                                onHide={() => setEditModalShow(false)}
                                title={
                                    <h1 title={group.name}>{group.name}</h1>
                                }
                                body={
                                    <Stack direction={"vertical"}>
                                        <p title="Descritpion">{group.description}</p>
                                        <GroupForm
                                            group={group}
                                            musicians={props.musicians}
                                            updateList={props.updateList}
                                        />
                                    </Stack>
                                }
                        />
                    </>
                    : ''
            }
        </>
    )
}
