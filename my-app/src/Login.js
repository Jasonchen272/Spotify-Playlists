import { Container } from 'react-bootstrap'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=cfb8208fc4174475b4b9a49286ec5e48&\
response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private\
%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state\
%20playlist-modify-public%20playlist-modify-private"

export default function Login() {
    return (
        <Container 
            className='d-flex justify-content-center align-items-center'
            style={{minHeight: "100vh"}}
        >
            
            <a className='btn btn-success btn-lg border-0' href={AUTH_URL} style = {{ background: 'linear-gradient(-45deg, #8860d0, #5680e9)'}}>
                Login With Spotify
            </a>
        </Container>
    )
}