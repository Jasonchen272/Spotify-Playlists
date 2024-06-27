import { useState} from 'react'
import { Container, Form } from'react-bootstrap'
import PlaylistItem from './PlaylistItem'

export default function Playlist({tracks, handleRemove, handleCreate, handleReturn}) {
    const [playlistName, setPlaylistName] = useState('New Playlist')
    const [isPrivate, setIsPrivate] = useState(false)
    const [confirm, setConfirm] = useState(false)
    function togglePrivate() {
            setIsPrivate(() => {return !isPrivate})
        }

    function handleCancel() {
        return () => {
            handleReturn();
        }
    }
    function handleNewPlaylist() {
        if (!confirm) {
            return () => {setConfirm(true)}
        }   else
            return () => {
                setConfirm(false);
                handleReturn();
                handleCreate(isPrivate, playlistName)
        }
    }


    return (
        <Container style = {{width: '80vh'}}>
            <Form.Control
            style = {{marginTop: '2vh'}}
            type = 'search' 
            placeholder = 'New Playlist' 
            value  = {playlistName}
            onChange={e => setPlaylistName(e.target.value)}
            ></Form.Control>
            <a className='btn btn-success btn-lg my-2' onClick={ handleNewPlaylist()}> {confirm ? "Confirm Create" : "Add to your Playlists"}</a>
            <a className='btn btn-success btn-lg ms-2' onClick = {handleCancel()}>Back</a>
            {/* <div className="form-check form-switch my-2"  onChange = {togglePrivate}> */} {/*uncomment if spotify fixes api */}
                {/* <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"></input>
                <label className="form-check-label" >Private Playlist</label> */}
            <div className='flex-grow-1 my-2' style ={{overflowY: "auto"}}>
                {tracks.map(track => (
                  <PlaylistItem track = {track} handleRemove = {handleRemove} key = {track.uri}></PlaylistItem>
                ))}

            </div>

        </Container>
    )
}