import { React} from 'react'
import { Container } from'react-bootstrap'
import ReccomendationItem from './ReccomendationItem'

export default function reccomendationInputsList({items, handleRemove}) {

    return (
        <Container  style = {{width: '50vh'}}>
            <div className='flex-grow-1 my-2' style ={{overflowY: "auto"}}>
                {items.map(item => {return <ReccomendationItem item = {item} handleRemove = {handleRemove} key = {item.uri}></ReccomendationItem>
                })}
            </div>

        </Container>
    )
}