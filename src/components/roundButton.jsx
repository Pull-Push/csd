import React from "react";

export default function RoundButton(props){
    let currentRound = props.roundNumber;
    let totalRounds = props.totalFights - 1

    // console.log('total rounds in button', totalRounds)
    function handleRoundChange(e){
    let newRound = currentRound;
        if(e.target.innerText === 'Next Round' && currentRound < totalRounds){
        newRound = currentRound + 1
    }else if(e.target.innerText === 'Previous Round' && currentRound !== 0){
        newRound = currentRound - 1
    }
    props.onRoundChange(newRound)
}
    // console.log('round button', props)
    return(
        <div className="roundButtonMainDiv">
            <button onClick={handleRoundChange}>Previous Round</button>
            <button onClick={handleRoundChange}>Next Round</button>
        </div>
    )
}