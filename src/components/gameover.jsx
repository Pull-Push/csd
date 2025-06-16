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
    }

    return(
        <div className={styles.gameOverMainDiv}>
            <div className={styles.gameOverHeader}>
                <img id={styles.headerLogo} src={require("../static/imgs/assets/logo_header.png")} alt="header" />     
            </div>
            <div className={styles.gameOverMainBody}>
                <div className={styles.secondPlaceDiv}>
                    <h3>Second Place Goes Here</h3>
                    <h5>wins:xx</h5>
                </div>
                <div className={styles.winnerDiv}>
                    <h2>WINNER GOES HERE</h2>
                    <h5>wins:xx</h5>
                    {/* <p>maybe winning fighters?</p> */}
                </div>
                <div className={styles.thirdPlaceDiv}>
                    <h4>if third place? it goes here</h4>
                    <h5>wins:xx</h5>
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