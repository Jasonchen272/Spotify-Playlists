import React from 'react'

export default function ArtistSearchResult({artist, handleAdd}) {
    function handleAddArtist(newArtist) {
        return () => handleAdd(newArtist)
    }
    return (
        
        <span className='d-flex align-items-center justify-content-between border border-3  border-info border-opacity-50 rounded-pill my-1'
        style = {{ background: 'linear-gradient(-45deg, #8860d0, #5680e9)'}}>            
        <div className = "d-flex my-2" >
          <img className = "rounded-circle ms-2" src = {artist.artistUrl} alt = {artist.name} style = {{height: '64px', width: '64px'}} />
          <div className='ms-3'>
            <div className = "fw-bold"  style = {{color: "white"}} > {artist.name} </div>
          </div>
        </div>
        <a className='btn btn-success btn-lg rounded-circle me-2' style = {{height: '48px', width: '48px'}} onClick = {handleAddArtist(artist)}
       >
                +
            </a>
        </span>
        
    )
}