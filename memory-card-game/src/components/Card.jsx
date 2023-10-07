import { useState } from 'react'
import '../styles/card.css'

export default function Card({pokeArray, pokeName, pokeImage, handleClick}){

    const [imageUrl, setImageUrl] = useState('')

    const getPokeImage = async (url) => {
        const source = url
        const data = await fetch(source, {mode : 'cors'})
        const jsonData = await data.json()
        const imageUrl = jsonData.sprites.front_default    
        setImageUrl(imageUrl)  
    }


    getPokeImage(pokeImage)

    return (
        <div className='card'>
            <div className='card-container' onClick={handleClick}>
                <h3 className='pokemon-name'>{pokeName}</h3>
                <img className='pokemone-image' src={imageUrl} alt={pokeName} />
            </div>
        </div>
    )
}