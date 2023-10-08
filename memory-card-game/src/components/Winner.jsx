import '../styles/winner.css'

export const Winner = ({score, text, handleClick}) => {

    return (
        <div className="winner-modal">
            <div className="winner-modal-container">
                <h2>Score : {score}</h2>
                <h2>{text}! Do You Want To Play Again?</h2>
                <button id="play-again-button" onClick={handleClick}>Play Again!</button>
            </div>
        </div>
    )
}