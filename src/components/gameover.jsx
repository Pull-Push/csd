import {React, useEffect, useState} from "react"
import styles from "../static/css/Gameover.module.css"
import { useLocation } from "react-router-dom"
import MatchHistory from "./matchHistory"


export default function GameOver(){
    const [sortedResults, setSortedResults ] = useState([])
    const [losers, setLosers ] = useState([])
    const location = useLocation()
    const {matchHistory,  gamePlayers} = location.state

    useEffect(() =>{
        console.log('gamePlayers', gamePlayers)
        console.log('match Histoy', matchHistory)
        compileResults()
        console.log('sortedResults', sortedResults)
        console.log('losers', losers)
    }, [sortedResults])

    function compileResults(){
        console.log('results incoming...')
        let tempLosers = []
        gamePlayers.sort((a, b) =>{
            if(a.wins > b.wins) return -1;
            if(a.wins < b.wins) return 1;
            return 0;
        });
        setSortedResults(gamePlayers)
        if(sortedResults.length > 3){
            for(let x = 3; x < sortedResults.length; x++){
                tempLosers.push(sortedResults[x])
            }
            setLosers(tempLosers)
        }
    }

    return(
        <div className={styles.gameOverMainDiv}>
            <div className={styles.gameOverHeader}>
                <img id={styles.headerLogo} src={require("../static/imgs/assets/logo_header.png")} alt="header" />     
            </div>
            <div className={styles.gameOverMainBody}>
                {sortedResults.length !== 0 ? (
                    <div className={styles.gameOverPlacesDiv}>
                        <div className={styles.secondPlaceDiv}>
                            <h3>2nd place: {sortedResults[1].name}</h3>
                            <h5>WINS: {sortedResults[1].wins}</h5>
                        </div>
                        <div className={styles.winnerDiv}>
                            <h2>1st place: {sortedResults[0].name}</h2>
                            <h5>WINS: {sortedResults[0].wins}</h5>
                            {/* <p>maybe winning fighters?</p> */}
                        </div>
                        <div className={styles.thirdPlaceDiv}>
                            {sortedResults.length > 2 ? (
                            <div>
                                <h3>3rd place: {sortedResults[2].name}</h3>
                                <h5>WINS: {sortedResults[2].wins}</h5>
                            </div>
                    ):(
                        <div className={styles.placeHolderDiv}>
                        </div>
                    )}
                </div>
                    </div>
                ) : (
                    <div className={styles.winnerDiv}>
                        <p>Loading....</p>
                    </div>
                )}
                <div className={styles.remainingPlayerDiv}>
                    {losers.length !== 0 ? (
                        losers.map((indy, index) => (
                            <div  className={styles.indyLoser} key={index}>
                                <p>{indy.name} </p>
                                <p>Wins: {indy.wins}</p>
                            </div>
                        ))
                    ):(
                        <div className={styles.placeHolderDiv}>
                        </div>
                    )}
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