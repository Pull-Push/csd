import {React, useEffect} from "react"
import styles from "../static/css/Gameover.module.css"
import { useLocation } from "react-router-dom"
import MatchHistory from "./matchHistory"


export default function GameOver(){
    const location = useLocation()
    const {matchHistory,  gamePlayers} = location.state

    useEffect(() =>{
        console.log('gamePlayers', gamePlayers)
        console.log('match Histoy', matchHistory)
        compileResults()
    }, [])

    function compileResults(){
        console.log('results incoming...')
        gamePlayers.sort((a, b) =>{
            if(a.wins > b.wins) return -1;
            if(a.wins < b.wins) return 1;
            return 0;
        });
        console.log('game players sorted?', gamePlayers)
        return gamePlayers
    }

    return(
        <div className={styles.gameOverMainDiv}>
            <div className={styles.gameOverHeader}>
                <img id={styles.headerLogo} src={require("../static/imgs/assets/logo_header.png")} alt="header" />     
            </div>
            <div className={styles.gameOverMainBody}>
                <div className={styles.secondPlaceDiv}>
                    <h3>{gamePlayers[1].name}</h3>
                    <h5>WINS: {gamePlayers[1].wins}</h5>
                </div>
                <div className={styles.winnerDiv}>
                    <h2>{gamePlayers[0].name}</h2>
                    <h5>WINS: {gamePlayers[0].wins}</h5>
                    {/* <p>maybe winning fighters?</p> */}
                </div>
                <div className={styles.thirdPlaceDiv}>
                    {gamePlayers[2] ? (
                        <div>
                            <h4>{gamePlayers[2].name}</h4>
                            <h5>WINS: {gamePlayers[2].wins}</h5>
                        </div>
                    ):(
                        <div>
                        </div>
                    )}
                </div>
                <div className={styles.remainingPlayerDiv}>
                    <p>if any other players, name here with wins</p>
                </div>
            </div>
            <div className={styles.gameOverHistory}>
                {matchHistory.length === 0 ?(
                    <p>NO GAMES WERE PLAYED</p>
                ):(
                    <MatchHistory history={matchHistory}/>
                )}
            </div>
            <div className={styles.gameOverButtons}>

            </div>
        </div>
    )
}