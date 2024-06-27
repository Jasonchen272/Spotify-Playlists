import React from 'react'

export default function PlaylistItem({track, handleRemove}) {
  function handleRemoveTrack(track) {
    return () => handleRemove(track)
  }
    return (
      <span className='d-flex align-items-center justify-content-between border border-3 border-info rounded-pill my-1'>            
      <div className = "d-flex my-2 "> 
          <img className = "rounded-circle ms-2"src = {track.albumUrl} alt = {track.title} style = {{height: '64px', width: '64px'}} />
          <div className='ms-3'>
            <div className = "fw-bold"> {track.title} </div>
            <div className='text-muted'>{track.artist}</div>
          </div>
        </div>
        <a className='btn btn-success btn-lg rounded-circle me-2' style = {{height: '48px', width: '48px'}} onClick={handleRemoveTrack(track)}>
                -
            </a>
        </span>
        
    )
}
