import {React, useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from '../static/css/Game.module.css'
import RoundButton from "./roundButton";
import { randomizeSetup } from "../utils/randomize";
import MatchHistory from "./matchHistory";



export default function Game(){
    const location = useLocation()
    const gameInfo = location.state
    
    const [currentRoundNumber, setCurrentRoundNumber] = useState(0)
    const [gameMainState, setGameMainState] = useState({'gamePlayers':[], 'roundFighters':[], 'roundNumber':currentRoundNumber})
    const [gamePlayers , setGamePlayers ] = useState([])
    const [matchHistory, setMatchHistory] = useState([])
    const [gameOver, setgameOver] = useState(false)
    
    const navigate = useNavigate();
    // const testPlayers = [{'id':1, 'name':'Player 1', 'chosen_fighters':['Mario', 'Link', 'Donkey Kong', 'Samus']},{'id':2, 'name':'Player 2', 'chosen_fighters':['Samus', 'Ice Climbers', 'Pit']},{'id':3, 'name':'Player 3', 'chosen_fighters':['Wario', 'Luigi', 'Marth']}]
    
    const currentRoundKey = `round_${currentRoundNumber + 1}`
    const currentRoundFighters = gameMainState.roundFighters[currentRoundNumber]?.[currentRoundKey]|| []

    useEffect(() =>{
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
        if(gameOver){
            navigate('/gameover', { state: { matchHistory, gamePlayers: gameMainState.gamePlayers } })

        }
    },[gameOver])

    
    function gameInit(){
        if(gamePlayers.length === 0){
            console.log('waiting for data...')
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
            // console.log('final roundFighters is', roundFighters)
            setGameMainState(prev => ({...prev, gamePlayers: gamePlayers}))
            setGameMainState(prev => ({...prev, roundFighters: roundFighters }))
        }
    }

    function handleRoundChange(newRound){
        setGameMainState(prev => ({...prev, roundNumber:newRound}))
        setCurrentRoundNumber(newRound)
    }

    function handleWinner(e){
        let totalFights = gamePlayers[0].random.length
        let winnerIndex = e.target.value;
        let currMatchHistory = {
            'round':currentRoundNumber+1,
            'fighters':currentRoundFighters,
            'winnerIndex':Number(winnerIndex)
        }
        let playerToUpdate = gameMainState.gamePlayers[Number(winnerIndex)]
        let updatedPlayer = playerToUpdate.wins += 1
        setMatchHistory(prev => [...prev, currMatchHistory])
        handleRoundChange(currentRoundNumber +1 )
        if(totalFights + 1 === currentRoundNumber + 2){
            let endGame = true;
            setgameOver(endGame)
        }
    }

    return(
        <div className={styles.gameMainDiv}>
            <div className={styles.gameHeaderDiv}>
                <img id={styles.headerLogo} src={require("../static/imgs/assets/logo_header.png")} alt="header" /> 
            </div>
                <h2 className={styles.roundNumber}>ROUND {currentRoundNumber+1}</h2>

            <div className={styles.gameBodyDiv}>
                {/* {console.log(currentRoundFighters)} */}
                {currentRoundFighters.length === 0 ? (
                    <h2> LOADING....</h2>
                ) : (
                    currentRoundFighters.map((indy, index) =>(
                        <div className={styles.indyRoundDiv} key={index}>
                            <div className={styles.indyRoundFighterDiv}>
                                <h2 className={styles[`player${index+1}`]}>{indy.name}</h2>
                                <img className={styles.fighterToon} src={require(`../static/imgs/LARGE_PHOTO/${indy.fighter[1]}_BIG.jpg`)} alt={indy.fighter}/>
                                <h4 className={styles[`player${index+1}`]}>{indy.fighter[1]}</h4>
                                <button onClick={(e)=> handleWinner(e)} value={index}>WINNER!</button>
                            </div>
                        </div>
                    ))
                )
                }
            </div>                
            <div className={styles.winsMainDiv}>
                {gameMainState.gamePlayers.map((indy, key) =>(
                    <div className={styles.winIndyDiv} key={key}>
                        {/* <h2>{indy.name}</h2> */}
                        <h3 className={styles[`player${key+1}`]}>WINS: {indy.wins}</h3>
                    </div>
                ))}
            </div>
            <div className={styles.roundButtonDiv}>
            {currentRoundFighters.length === 0 ? (
                <RoundButton roundNumber={currentRoundNumber} onRoundChange={handleRoundChange}/>
            ):(
                <RoundButton matchHistory={matchHistory} roundNumber={currentRoundNumber} gameMainState={gameMainState} totalFights={gamePlayers[0].random.length} onRoundChange={handleRoundChange}/>
            )}
            </div>
            <div className={styles.gameLowerDiv}>
                {matchHistory.length === 0 ?(
                    <p>No History Yet....</p>
                ):(
                    <MatchHistory history={matchHistory}/>
                )}
            </div>
        </div>
        
    )
}