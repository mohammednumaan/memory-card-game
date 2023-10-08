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
    
    const handleClick = (e, name) => {
        game(e, name)
        setPokeData(shuffleArray(pokeData)) 
    }

    const handlePlayAgainClick = () => {
        setGameOver(false)
        setScore(0)
        setChoosenCards([])
        setPokeData(shuffleArray(pokeData))
    }

    const game = (e, name) => {
        
        if (choosenCards.includes(e.target.textContent)) {
            setGameOver(true)
        }

        else {
            
            choosenCards.push(name)
            setChoosenCards(choosenCards)
            setScore(score => score + 1)
        }

    }

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

    useEffect(() => {
        if (score === 8) {
            setGameOver(true)
            setChoosenCards([])
        }

    }, [score, scoreArray])

    useEffect(() => {
        
        scoreArray.push(score)
        setScoreArray(scoreArray)
        
        const sortedArray = maxOfArray(scoreArray)
        setScoreArray(sortedArray)

        setBestScore(scoreArray[scoreArray.length - 1])

    }, [score, scoreArray])

    return (
        <div className='game-container'>
            <Header />
            <Scoreboard score={score} bestScore={bestScore} />
            {!gameOver && (
                <div className='all-cards'>
                {
                    pokeData.map(pokemon => 
                        <Card key={pokemon.name} pokeArray={pokeData} pokeName={pokemon.name} pokeImage={pokemon.url} handleClick={(event) => handleClick(event, pokemon.name)}/>
                    )
                }
                </div>
            )}


            <div className='winner-modal'>
                {(gameOver && score !== 8) && (
                    <Winner text={'You Lose!'} score={score} handleClick={(event) => handlePlayAgainClick(event)} />
                )}

                {(gameOver && score === 8) && (
                    <Winner text={'You Win!'} score={score} handleClick={(event) => handlePlayAgainClick(event)} />
                )}
            </div>

        </div>
    )
}


