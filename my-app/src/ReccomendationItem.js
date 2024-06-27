import React from 'react'

export default function ReccomendationItem({item, handleRemove}) {
  function handleRemoveItem(items) {
    return () => handleRemove(items)
  }
    if (item.type == 'artist') {

        return (
            <span className=' d-flex align-items-center justify-content-between border border-3  border-info border-opacity-50 rounded-pill my-1'  
            style = {{ background: 'linear-gradient(-45deg, #8860d0, #5680e9)'}}>
                <div className = "d-flex my-2"> 
                <img className = "rounded-circle ms-2" src = {item.artistUrl} alt = {item.name} style = {{height: '64px', width: '64px'}} />
                <div className='ms-3'>
                    <div className="fw-bold" style = {{color: "white"}}> {item.name} </div>
                </div>
                </div>
                <a className='btn btn-success btn-lg rounded-circle me-2' style = {{height: '48px', width: '48px'}} onClick={handleRemoveItem(item)}>
                    -
                </a>
            </span>
        )
    } else if (item.type == 'track') {
        return (
            <span className='d-flex align-items-center justify-content-between border border-3  border-info border-opacity-50 rounded-pill my-1'
            style = {{ background: 'linear-gradient(-45deg, #8860d0, #5680e9)'}}>
                <div className = "d-flex my-2 "> 
            <img  className = "rounded-circle ms-2" src = {item.albumUrl} alt = {item.title} style = {{height: '64px', width: '64px'}} />
            <div className='ms-3'>
                <div  className="fw-bold" style = {{color: "white"}}> {item.title} </div>
                <div  style = {{color: "white"}}>{item.artist}</div>
            </div>
            </div>
            <a className='btn btn-success btn-lg rounded-circle me-2' style = {{height: '48px', width: '48px'}} onClick={handleRemoveItem(item)}>
                    -
                </a>
            </span>
            
        )
    } else {
        return (
        <span className='d-flex align-items-center justify-content-between border border-3 border-info border-opacity-50 rounded-pill my-1 text-muted ps-3' style = {{height: '86px'}}>
            Input an artist or track.
        </span>
        )
    }
}
