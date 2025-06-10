import React from "react";
import '../static/css/matchHistory.css'


export default function MatchHistory(props){
    let matchHistory = props.history
    console.log('match history', matchHistory)
    return(
        <div className="matchHistoryMainDiv">
            {matchHistory.map((singleRound, index)=>(
                <div className="singleRoundDiv" key={index}>
                    <p>Round {singleRound.round}:</p>
                    {singleRound.fighters.map((fighters, fighterIndex) =>
                        singleRound.winnerIndex === fighterIndex ? (
                            <div className="singleRoundFIghterDiv roundWinner" key={fighterIndex}>
                                <img className="singleRoundAvatar" src={require(`../static/imgs/SMALL_PHOTO/${fighters.fighter[1]}.jpg`)} alt={fighters.fighter[1]} />
                                <p>{fighters.fighter[1]}</p>
                            </div>
                        ) : (
                            <div className="singleRoundFIghterDiv" key={fighterIndex}>
                                <img className="singleRoundAvatar" src={require(`../static/imgs/SMALL_PHOTO/${fighters.fighter[1]}.jpg`)} alt={fighters.fighter[1]} />
                                <p>{fighters.fighter[1]}</p>
                            </div>
                        )
                    )}
                </div>
            ))}
        </div>
    )
}