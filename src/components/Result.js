import React, { useState } from 'react';

const Result = ({ score,playAgain }) => {
    return (
        <div className='score-board'>
            <div className="score">
                You score {score} / 5 correct answers!
            </div>
            <button className='playBtn' onClick={playAgain}>Play Again</button>
        </div>
    )
}

export default Result