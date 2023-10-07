import { useState, useEffect } from 'react'
import '../styles/app.css'
import Card from './Card'
import Header from './Header'
import Scoreboard from './Scoreboard'
import { shuffleArray } from '../util/shuffleArray'
import maxOfArray from '../util/maxOfArray'
import { Winner } from './Winner'


export default function App() {

    const [pokeData, setPokeData] = useState([])
    const [choosenCards, setChoosenCards] = useState([])
    const [scoreArray, setScoreArray] = useState([])
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    
    const handleClick = (e) => {

        game(e)
        setPokeData(shuffleArray(pokeData))
    }

    const sortScoreArray = (newScore) => {

        scoreArray.push(newScore)
        setScoreArray(scoreArray)
        let sortedArray = maxOfArray(scoreArray)
        return sortedArray

    }

    const game = (e) => {
        
        checkGameOver() 
        if (choosenCards.includes(e.target.textContent)) {
            
            sortScoreArray(score)
            setBestScore(scoreArray[scoreArray.length - 1])
            setScore(0)
            setChoosenCards([])
            setGameOver(true)
        }
        else {
            
            setChoosenCards([...choosenCards, e.target.textContent])
    
            setScore(score => score + 1)
        }

    }

    const checkGameOver = () => {
        if (gameOver){
            return (
                <Winner score={score} />
            )
        }
        else return;
    }
  

    const getPokeData = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=8&offset=0`
        const data = await fetch(url, {mode : 'cors'})
        const jsonData = await data.json()
        let pokemonData = jsonData.results
        setPokeData(pokemonData)
        
    }

    
    return (
        <>
            <Header />
            <Scoreboard score={score} bestScore={bestScore} />
            <div className='all-cards'>
                {
                    pokeData.map(pokemon => 
                        <Card key={pokemon.name} pokeArray={pokeData} pokeName={pokemon.name} pokeImage={pokemon.url} handleClick={(event) => handleClick(event)}/>
                    )
                }
            </div>

        </>
    )
}


