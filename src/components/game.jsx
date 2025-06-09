import {React, use, useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import '../static/css/game.css'
import RoundButton from "./roundButton";
import { randomizeSetup } from "../utils/randomize";



export default function Game(){
    const location = useLocation()
    const gameInfo = location.state
        
    const [currentRoundNumber, setCurrentRoundNumber] = useState(0)
    const [gameMainState, setGameMainState] = useState({'gamePlayers':[], 'roundFighters':[], 'roundNumber':currentRoundNumber})
    const [winners, setWinners ] = useState([])
    const [gamePlayers , setGamePlayers ] = useState([])
    
    // const testPlayers = [{'id':1, 'name':'Player 1', 'chosen_fighters':['Mario', 'Link', 'Donkey Kong', 'Samus']},{'id':2, 'name':'Player 2', 'chosen_fighters':['Samus', 'Ice Climbers', 'Pit']},{'id':3, 'name':'Player 3', 'chosen_fighters':['Wario', 'Luigi', 'Marth']}]
    
    const currentRoundKey = `round_${currentRoundNumber + 1}`
    const currentRoundFighters = gameMainState.roundFighters[currentRoundNumber]?.[currentRoundKey]|| []

    useEffect(() =>{
        // console.log('first useEffect ran')
        const fetchGameData = async () => {
        const data = await randomizeSetup(gameInfo);
       // Perform actions with the fetched data
            setGamePlayers(data)
        };
        fetchGameData();
    },[gameInfo])
    
    useEffect(() =>{
        // console.log('second effect ran');
        gameInit()
    }, [gamePlayers])

    useEffect(()=>{
        if(!(gamePlayers.length === 0)){
            // console.log('game main state', gameMainState)
        }
    },[gameMainState])

    
    function gameInit(){
        if(gamePlayers.length === 0){
            console.log('waiting...')
        }else{
            // console.log('gameplayers in init', gamePlayers)
            // console.log('gamePlayers in init', gamePlayers[0].random.length)
            let roundFighters = []
            let totalFighters = gamePlayers[0].random.length
            for(let x = 0; x<totalFighters; x++){
                // console.log('ROUND',x+1)
                let roundInit = {
                    [`round_${x+1}`]:[]
                }
                roundFighters.push(roundInit)
                for(let y of gamePlayers){
                    // console.log('player is', y.name)
                    // console.log('fighter is', y.random[x])
                    roundFighters[x][`round_${x+1}`].push({'id': y.id , 'name':y.name, 'fighter':y.random[x]})
                }
            }
            console.log('final roundFighters is', roundFighters)
            setGameMainState(prev => ({...prev, roundFighters: roundFighters }))
        }
    }
    function handleRoundChange(newRound){
        setCurrentRoundNumber(newRound)
    }

    function handleWinner(e){
        // const roundWinner = [finalSetup[currentRoundNumber][`round_${currentRoundNumber + 1}`]]
        // for(let x of roundWinner[0]){
        //     if(e.target.value === x.fighter){
        //         x['winner'] = true
        //     }else{
        //         x['winner'] = false
        //     }
        // }
        // setWinners(prev => [...prev, roundWinner])
    }
    
    // const finalSetup = gameInit()

    return(
        <div className="gameMainDiv">
            <div className="gameHeaderDiv">
                <img id="headerLogo" src={require("../static/imgs/assets/logo_header.png")} alt="header" />
                
            </div>
                <h2>ROUND {currentRoundNumber+1}</h2>
            <div className="gameBodyDiv">
                {console.log('current round fighters', currentRoundFighters)}
                {currentRoundFighters.length === 0 ? (
                    <h2> LOADING....</h2>
                ) : (
                    currentRoundFighters.map((indy, index) =>(
                        <div className='indyRoundDiv' key={index}>
                            <div className='indyRoundFighterDiv'>
                                <p>{indy.name}</p>
                                <img className='fighterToon' src={require(`../static/imgs/LARGE_PHOTO/${indy.fighter[1]}_BIG.jpg`)} alt={indy.fighter}/>
                                <h4>{indy.fighter[1]}</h4>
                                <button onClick={(e)=> handleWinner(e)} value={indy.fighter}>WINNER!</button>
                            </div>
                        </div>
                    ))
                )
            }
            </div>
            {currentRoundFighters.length === 0 ? (
                < RoundButton roundNumber={currentRoundNumber} onRoundChange={handleRoundChange}/>
            ):(
                < RoundButton roundNumber={currentRoundNumber} totalFights={gamePlayers[0].random.length} onRoundChange={handleRoundChange}/>
            )
            }
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