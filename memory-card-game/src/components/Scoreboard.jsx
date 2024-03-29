import '../styles/scoreboard.css'

export default function Scoreboard({score, bestScore}){
    return (
        <>
        
            <div className="scoreboard">
                <div className="scoreboard-container">
                    <h4 className="current-score">Score : {score}</h4>
                    <h4 className="best-score">Best Score : {bestScore}</h4>
                </div>
            </div>

            <div className='score-instructions'>
                <p>If You Score 8 Points! You Win The Game :)</p>
            </div>
        </>
    )
}