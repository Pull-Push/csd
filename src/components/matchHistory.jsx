import React from "react";
import styles from '../static/css/MatchHistory.module.css'


export default function MatchHistory(props){
    let matchHistory = props.history
    console.log('match history', matchHistory)
    return(
        <div className={styles.matchHistoryMainDiv}>
            {matchHistory.map((singleRound, index)=>(
                <div className={styles.singleRoundDiv} key={index}>
                    <p>Round {singleRound.round}:</p>
                    {singleRound.fighters.map((fighters, fighterIndex) =>
                        singleRound.winnerIndex === fighterIndex ? (
                            <div className={`${styles.singleRoundFIghterDiv} ${styles.roundWinner}`} key={fighterIndex}>
                                <img className={styles.singleRoundAvatar} src={require(`../static/imgs/SMALL_PHOTO/${fighters.fighter[1]}.jpg`)} alt={fighters.fighter[1]} />
                                <p className={styles[`player${fighterIndex+1}`]}>{fighters.fighter[1]}</p>
                            </div>
                        ) : (
                            <div className={styles.singleRoundFighterDiv} key={fighterIndex}>
                                <img className={styles.singleRoundAvatar} src={require(`../static/imgs/SMALL_PHOTO/${fighters.fighter[1]}.jpg`)} alt={fighters.fighter[1]} />
                                <p className={styles[`player${fighterIndex+1}`]}>{fighters.fighter[1]}</p>
                            </div>
                        )
                    )}
                </div>
            ))}
        </div>
    )
}