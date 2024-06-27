import {useState, useEffect} from 'react'
import useAuth from './useAuth'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'
import Playlist from './Playlist'
import ArtistSearchResult from './ArtistSearchResult'
import ReccomendationInputsList from './ReccomendationInputsList'

const spotifyApi = new SpotifyWebApi({
    clientId: 'cfb8208fc4174475b4b9a49286ec5e48'
})

const genres = [
    "acoustic",
    "afrobeat",
    "alt-rock",
    "alternative",
    "ambient",
    "anime",
    "black-metal",
    "bluegrass",
    "blues",
    "bossanova",
    "brazil",
    "breakbeat",
    "british",
    "cantopop",
    "chicago-house",
    "children",
    "chill",
    "classical",
    "club",
    "comedy",
    "country",
    "dance",
    "dancehall",
    "death-metal",
    "deep-house",
    "detroit-techno",
    "disco",
    "disney",
    "drum-and-bass",
    "dub",
    "dubstep",
    "edm",
    "electro",
    "electronic",
    "emo",
    "folk",
    "forro",
    "french",
    "funk",
    "garage",
    "german",
    "gospel",
    "goth",
    "grindcore",
    "groove",
    "grunge",
    "guitar",
    "happy",
    "hard-rock",
    "hardcore",
    "hardstyle",
    "heavy-metal",
    "hip-hop",
    "holidays",
    "honky-tonk",
    "house",
    "idm",
    "indian",
    "indie",
    "indie-pop",
    "industrial",
    "iranian",
    "j-dance",
    "j-idol",
    "j-pop",
    "j-rock",
    "jazz",
    "k-pop",
    "kids",
    "latin",
    "latino",
    "malay",
    "mandopop",
    "metal",
    "metal-misc",
    "metalcore",
    "minimal-techno",
    "movies",
    "mpb",
    "new-age",
    "new-release",
    "opera",
    "pagode",
    "party",
    "philippines-opm",
    "piano",
    "pop",
    "pop-film",
    "post-dubstep",
    "power-pop",
    "progressive-house",
    "psych-rock",
    "punk",
    "punk-rock",
    "r-n-b",
    "rainy-day",
    "reggae",
    "reggaeton",
    "road-trip",
    "rock",
    "rock-n-roll",
    "rockabilly",
    "romance",
    "sad",
    "salsa",
    "samba",
    "sertanejo",
    "show-tunes",
    "singer-songwriter",
    "ska",
    "sleep",
    "songwriter",
    "soul",
    "soundtracks",
    "spanish",
    "study",
    "summer",
    "swedish",
    "synth-pop",
    "tango",
    "techno",
    "trance",
    "trip-hop",
    "turkish",
    "work-out",
    "world-music"
  ]

export default function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('') 
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [playlistTracks, setPlaylistTracks] = useState([])
    const [reccomendationsDone, setReccomendationsDone] = useState(false)
    const [searchType, setSearchType] = useState('Artist')
    const [reccomendationInputs, setReccomendationInputs] = useState([
        { type: 'filler' },
        { type: 'filler' },
        { type: 'filler' },
        { type: 'filler' },
        { type: 'filler' },
      ]);
    function addPlaylist(isPrivate, name) {
        if (playlistTracks == []) {return}
        if (name === '') { name = 'New Playlist' }
        spotifyApi.createPlaylist(name, { 'description': '', 'public': !isPrivate })
            .then(res => {
                spotifyApi.addTracksToPlaylist(res.body.id, playlistTracks.map(track => { return track.uri}))
            }
            ).catch(error => {
                console.log(error)
            })
        setPlaylistTracks([])
    }

    function addTrack(newTrack) {
        if (reccomendationsDone) {
        setPlaylistTracks((prevTracks) => {
            if (prevTracks.find(track => track.uri === newTrack.uri)) {
              return prevTracks;
            }
            return [...prevTracks, newTrack];
          })
        } else {
            setReccomendationInputs((prevInputs) => {
                if (prevInputs.find(track => track.uri === newTrack.uri)) {
                  return prevInputs;
                }
                
                return [...prevInputs, newTrack];
              })
        }
    }

    function addReccomendation(newInput) {

        if (reccomendationInputs[4].type != 'filler') { console.log('too many inputs'); return; }
        setReccomendationInputs((prevInputs) => {
            if (prevInputs.find(artist =>  artist.uri === newInput.uri)) {
              return prevInputs;
            }
            return [newInput, ...prevInputs.slice(0, -1)];
          })
    }

    function removeReccomendation(toRemove) {
        setReccomendationInputs([...reccomendationInputs.filter(item => item.uri!== toRemove.uri), { type: 'filler' }])

    }

    function removeTrack(track) {
        setPlaylistTracks(playlistTracks.filter(t => t.uri!== track.uri))
    }

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
    }

    function generatePlaylist() {
        if (!accessToken) { return }

        if (reccomendationInputs[0].type == 'filler') { console.log('no inputs');return }
        setReccomendationsDone(true)

        const seedArtists = reccomendationInputs.filter(item => item && item.type === 'artist')
        const seedTracks = reccomendationInputs.filter(item => item && item.type === 'track')
        spotifyApi.getRecommendations({ limit: 20, seed_artists: seedArtists.map(artist => artist.artistID), seed_tracks: seedTracks.map(track => track.trackID)})
        .then(res => {
            setPlaylistTracks(res.body.tracks.map(track => {
                const smallestAlbumImage = track.album.images.reduce(
                    (minImage, image) => (image.height < minImage.height)? image : minImage, track.album.images[0])
                    let hasImage = track.album.images.length > 0
                return {
                    type: 'track',
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: hasImage ? smallestAlbumImage.url : '',
                    trackID: track.id
                }
            }))
        }).catch(error => { console.log(error) })

    }

    useEffect(() => {
        if (!accessToken) { return }
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    function handleSearch() {
        if (!search) { return }
        if (searchType === 'Artist') {

            spotifyApi.searchArtists(search).then(res => {
                setSearchResults(res.body.artists.items.map(artist => {
                    const smallestArtistImage = artist.images.reduce(
                        (minImage, image) => (image.height < minImage.height)? image : minImage, artist.images[0])
                        let hasImage = artist.images.length > 0
                    return {
                        type: 'artist',
                        name: artist.name,
                        uri: artist.uri,
                        artistUrl: hasImage ? smallestArtistImage.url : '',
                        artistID: artist.id
                    }
                }))
            })
        } else {

            spotifyApi.searchTracks(search).then(res => {
                setSearchResults(res.body.tracks.items.map(track => {

                    const smallestAlbumImage = track.album.images.reduce(
                        (minImage, image) => (image.height < minImage.height)? image : minImage, track.album.images[0])
                        let hasImage = track.album.images.length > 0
                    return {
                        type: 'track',
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: hasImage ? smallestAlbumImage.url : '',
                        trackID: track.id
                    }
                }))
            }). catch(error => { console.log(error) })
        }
        setSearch('')
    }

    useEffect(() => {
        if (!search) { return } setSearchResults([])
        if (!accessToken) { return }
            let cancel = false
            
            spotifyApi.searchTracks(search).then(res => {
                if (cancel) return
                setSearchResults(res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (minImage, image) => (image.height < minImage.height)? image : minImage, track.album.images[0])
                        let hasImage = track.album.images.length > 0
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: hasImage ? smallestAlbumImage.url :''
                    }
                }))
            })
            return () => cancel = true

    }, [accessToken])
    if (reccomendationsDone) {
    return (
        <Container className='d-flex flex-column py-2' >
            <div className='d-flex'>
                <Playlist tracks={playlistTracks} handleRemove = {removeTrack} handleCreate = {addPlaylist} handleReturn={()=>setReccomendationsDone(false)}/>
            </div>
            
        </Container>  )
        }  else {
            return (
            <Container className='d-flex flex-column py-2'>
                <div className='d-flex'>
                <select className="form-select me-2" style = {{width:"10vh"}} aria-label="Default select example"
                    onChange= {(e) => {setSearchResults([]); setSearchType(e.target.value)}}>
                    <option value="Artist">Artist</option>
                    <option value="Track">Track</option>
                </select>    
                <Form.Control 
                    type = 'search' 
                    placeholder = 'Search' 
                    value={search}
                    onChange={e => {(e.target.addEventListener("keydown", function(event) {
                        if (event.keyCode === 13) {
                            handleSearch()
                        }
                    }));setSearch(e.target.value)}}
                    /> 
                <a className='btn btn-success btn-lg mx-2 border-0' onClick = {handleSearch}  style = {{ background: 'linear-gradient(-45deg, #8860d0, #5680e9)'}}>Search</a>
                <a className='btn btn-success btn-lg border-0'  style = {{width:"30vh", background: 'linear-gradient(-45deg, #8860d0, #5680e9)'}} onClick = {generatePlaylist} >Generate Playlist</a>
                </div>
                <div className='d-flex'>
                <div className='flex-grow-1 my-2' style ={{overflowY: "auto"}}>
                {searchResults.map(res => {if( searchType === 'Track') {
                        return(
                        <TrackSearchResult 
                        key={res.uri} 
                        track={res} 
                        chooseTrack={chooseTrack}
                        handleAdd = {addReccomendation}
                        />
                )}
                     else if (searchType === 'Artist') { 
                        return(
                        <ArtistSearchResult 
                        key={res.uri}
                        artist={res}
                        handleAdd={addReccomendation}
                        />)
                    } else {
                        console.log('error')
                        return null
                    }}                
                    )}

                    </div >
                    <div style={{height:'100vh'}}>
                    <ReccomendationInputsList items = {reccomendationInputs} handleRemove = {removeReccomendation}/>

                    </div>
                    </div>
            </Container>
            )
        }
    
}