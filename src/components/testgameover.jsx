import React from "react"
import styles from "../static/css/Gameover.module.css"
import { useLocation } from "react-router-dom"
import MatchHistory from "./matchHistory"


export default function TestGameOver(){
    const location = useLocation()
    const matchHistory = location.state
    return(
        <div className={styles.gameOverMainDiv}>
            <div className={styles.gameOverHeader}>
                <img id={styles.headerLogo} src={require("../static/imgs/assets/logo_header.png")} alt="header" />     
            </div>
            <div className={styles.gameOverMainBody}>
            <h2>GAME OVER SCREEN!</h2>
            </div>
            <div className={styles.gameOverHistory}>
                {matchHistory.length === 0 ?(
                    <p>No History Yet....</p>
                ):(
                    <MatchHistory history={matchHistory}/>
                )}
            </div>
            <div className={styles.gameOverButtons}>

            </div>
        </div>
    )
}