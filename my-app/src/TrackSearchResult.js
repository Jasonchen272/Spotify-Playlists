import React from 'react'

export default function TrackSearchResult({track, chooseTrack, handleAdd}) {
    function handlePlay() {
        chooseTrack(track)
    }

    function handleAddTrack(track) {
        return () => handleAdd(track)
    }
    return (
        <span className='d-flex align-items-center justify-content-between border border-3 border-info border-opacity-50 rounded-pill my-1'
        style = {{background: 'linear-gradient(-45deg, #8860d0, #5680e9)'}}>
        <div className = "d-flex my-2 " 
        style={{cursor:"pointer"}}
        onClick= {handlePlay}> 
          <img className = "rounded-circle ms-2" src = {track.albumUrl} alt = {track.title} style = {{height: '64px', width: '64px'}} />
          <div className='ms-3'>
            <div className = "fw-bold"  style = {{color: "white"}}> {track.title} </div>
            <div  style = {{color: "white"}}>{track.artist}</div>
          </div>
        </div>
        <a className='btn btn-success btn-lg rounded-circle me-2' style = {{height: '48px', width: '48px'}} onClick = {handleAddTrack(track)}
       >
                +
            </a>
        </span>
        
    )
}