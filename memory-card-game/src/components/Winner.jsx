export const Winner = ({score}) => {
    return (
        <div className="winner-modal">
            <div className="winner-modal-container">
                <h2>Score : {score}</h2>
                <h2>Game Over! Do You Want To Play Again?</h2>
                <button id="restart-game">Play Again!</button>
            </div>
        </div>
    )
}