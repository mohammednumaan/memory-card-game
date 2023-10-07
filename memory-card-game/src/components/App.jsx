import { useState, useEffect } from 'react'
import '../styles/app.css'
import Card from './Card'
import Header from './Header'
import Scoreboard from './Scoreboard'
import { shuffleArray } from '../util/shuffleArray'


export default function App() {

    const [pokeData, setPokeData] = useState([])
    const [choosenCards, setChoosenCards] = useState([])
    const [allScores, setAllScores] = useState([])
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)
    
    const handleClick = (e) => {

        updateScore(e)
        setPokeData(shuffleArray(pokeData))
    }

    const updateScore = (e) => {
        if (choosenCards.includes(e.target.textContent)) {
            setScore(0)
            setChoosenCards([])
            alert('New Game!')
        }
        else {
            let currentScore = score
            setChoosenCards([...choosenCards, e.target.textContent])
            
            setScore(score + 1)
            setBestScore(currentScore)
        }

    }
    console.log(score)

    const getPokeData = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=8&offset=0`
        const data = await fetch(url, {mode : 'cors'})
        const jsonData = await data.json()
        let pokemonData = jsonData.results
        setPokeData(pokemonData)
        
    }

    useEffect(() => {
        getPokeData()
    }, [])


    return (
        <>
            <Header />
            <Scoreboard score={score} bestScore={bestScore} />
            <div className='all-cards'>
                {
                    pokeData.map(pokemon => 
                        <Card key={pokemon.name} pokeArray={pokeData} pokeName={pokemon.name} pokeImage={pokemon.url} handleClick={handleClick}/>
                    )
                }
            </div>

        </>
    )
}


