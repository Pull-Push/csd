import {React, useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import '../static/css/game.css'
import RoundButton from "./roundButton";

export default function Game(){
    const [currentRoundNumber, setCurrentRoundNumber] = useState(0)
    const [currentRoundFighters, setCurrentRoundFighters] = useState([])
    const [winners, setWinners ] = useState([])
    const location = useLocation();
    // const players = location.state
    const testPlayers = [{'id':1, 'name':'Player 1', 'chosen_fighters':['Mario', 'Link', 'Donkey Kong', 'Samus']},{'id':2, 'name':'Player 2', 'chosen_fighters':['Samus', 'Ice Climbers', 'Pit']},{'id':3, 'name':'Player 3', 'chosen_fighters':['Wario', 'Luigi', 'Marth']}]

    useEffect(() =>{
        console.log('winners are', winners)
    }, [winners])


    function gameInit(){
        let roundFighters = []
        let totalFighters = testPlayers[0].chosen_fighters.length
        for(let x = 0; x<totalFighters; x++){
            // console.log('ROUND',x+1)
            let roundInit = {
                [`round_${x+1}`]:[]
            }
            roundFighters.push(roundInit)
            for(let y of testPlayers){
                // console.log('player is', y.name)
                // console.log('fighter is', y.chosen_fighters[x])
                roundFighters[x][`round_${x+1}`].push({'id': y.id , 'name':y.name, 'fighter':y.chosen_fighters[x]})
            }
        }
        // console.log('final roundFighters is', roundFighters)
        return roundFighters
    }
    function handleRoundChange(newRound){
        setCurrentRoundNumber(newRound)
    }

    function handleWinner(e){
        const roundWinner = [finalSetup[currentRoundNumber][`round_${currentRoundNumber + 1}`]]
        for(let x of roundWinner[0]){
            if(e.target.value === x.fighter){
                x['winner'] = true
            }else{
                x['winner'] = false
            }
        }
        setWinners(prev => [...prev, roundWinner])
    }
    
    const finalSetup = gameInit()

    return(
        <div className="gameMainDiv">
            <div className="gameHeaderDiv">
                <img id="headerLogo" src={require("../static/imgs/assets/logo_header.png")} alt="header" />
                
            </div>
                <h2>ROUND {currentRoundNumber+1}</h2>
            <div className="gameBodyDiv">
                {finalSetup[currentRoundNumber][`round_${currentRoundNumber + 1}`].map((indy, index) =>(
                    <div className='indyRoundDiv' key={index}>
                        <div className='indyRoundFighterDiv'>
                            <p>{indy.name}</p>
                            <img className='fighterToon' src={require(`../static/imgs/LARGE_PHOTO/${indy.fighter}_BIG.jpg`)} alt={indy.fighter}/>
                            <h4>{indy.fighter}</h4>
                            <button onClick={(e)=> handleWinner(e)} value={indy.fighter}>WINNER!</button>
                        </div>
                    </div>
                ))}
            </div>
            < RoundButton roundNumber={currentRoundNumber} onRoundChange={handleRoundChange}/>
            <div className="gameLowerDiv">
                {winners.map((round, index) =>(
                    <div className="winnerMainDiv">
                        <div className="winnerIndyDiv" key={index}>
                        <p>{round.fighter}</p>
                        <p>{round.name}</p>
                        </div>
                    </div>
                ))}
                <p>fight result table will eventuall go here</p>
            </div>
        </div>
        
    )
}