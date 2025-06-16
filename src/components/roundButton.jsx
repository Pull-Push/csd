import React from "react";
import styles from '../static/css/Game.module.css'
import { useNavigate } from "react-router-dom";


export default function RoundButton(props){
    const navigate = useNavigate()
    let currentRound = props.roundNumber;
    let totalRounds = props.totalFights
    let matchHistory = props.matchHistory
    let gameMainState = props.gameMainState

    function handleRoundChange(e){
        let newRound = currentRound;
        if(e.target.innerText === 'Next Round' && currentRound <= totalRounds-1){
            newRound = currentRound + 1
        }else if(e.target.innerText === 'Previous Round' && currentRound !== 0){
            newRound = currentRound - 1
        }
    
        if(totalRounds+1 === currentRound + 2){
            console.log('GAME OVER!')
            navigate('/gameover', { state:{ matchHistory: matchHistory, gamePlayers: gameMainState.gamePlayers }})
        }
        
    props.onRoundChange(newRound)
    }
    return(
        <div className="roundButtonMainDiv">
            <button className={styles.roundButton} onClick={handleRoundChange}>Previous Round</button>
            <button className={styles.roundButton} onClick={handleRoundChange}>Next Round</button>
        </div>
    )
}