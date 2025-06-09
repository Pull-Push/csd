import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { randomizeSetup } from "../utils/randomize";

export default function GameStart(){
    const location = useLocation()
    const gameInfo = location.state


    useEffect(()=>{
        console.log('useEffect ran')
        console.log('from useEffect', randomizeSetup(gameInfo))
        
    })

    return(
        <div className="gameStartMain">
            <h2> GameStart </h2>
        </div>
    )
}