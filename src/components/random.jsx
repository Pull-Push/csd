import {React, useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { gameInitData } from "../data/gamedatasample";
import { toonData } from "../data/toondata";

const gameInit = gameInitData
const allFighters = toonData

export default function Randomize(){
    const [gameFinal, setGameFinal] = useState(gameInit)
    const [randomized, setRandomized] = useState([])
    const [remaining, setRemaining] = useState(allFighters)
    // const location = useLocation() //THIS IS THE RIGHT WAY TO IMPORT THE DATA
    // const gameInit = location.state //THIS IS THE RIGHT WAY TO IMPORT THE DATA
    useEffect(() =>{
        randomizeSetup()
        console.log('UE gameFinal', gameFinal)
        // console.log('remaining', remaining)
    }, [gameFinal])

    function randomizeSetup(){
        let tempGameFinal = gameFinal
        for(let x=0; x<tempGameFinal.length; x++){
            let rands = []
            for(let y of tempGameFinal[x].chosen_fighters){
                rands.push([Math.random(), y])
                tempGameFinal[x].random = rands
                tempGameFinal[x].random.sort() //THIS WORKS TO SORT EACH RANDOMIZED ARRAY!!!
            }
        }
        // TODO Need to compare all lists to remove dupes from player lists 
        duplicateRemover(tempGameFinal)
        setGameFinal(tempGameFinal)
    }

    function duplicateRemover(tempGameFinal){
        for(let x = 0; x<tempGameFinal.length-1; x++){
            // console.log('comparing this list', tempGameFinal[x])
            for(let y = x+1; y<tempGameFinal.length; y++){
                // console.log('to this list', tempGameFinal[y])
                    tempGameFinal[x].random.forEach((fighterx) => {
                        tempGameFinal[y].random.forEach((fighterY) => {
                            if (fighterx[1] === fighterY[1] && fighterx[0] < fighterY[0]) {
                                // console.log('FOUND A MATCH! X SIDE WINS');
                                // console.log('x fighter', fighterx, 'y fighter', fighterY)
                                tempGameFinal[y].random = tempGameFinal[y].random.filter((fighter) => fighter !== fighterY)
                                // console.log('after removal', tempGameFinal[y])
                            }else if(fighterx[1] === fighterY[1] && fighterx[0] > fighterY[0]){
                                // console.log('FOUND A MATCH! Y SIDE WINS');
                                // console.log('x fighter', fighterx, 'y fighter', fighterY)
                                tempGameFinal[x].random = tempGameFinal[x].random.filter((fighter) => fighter !== fighterx)
                                // console.log('after removal', tempGameFinal[x])
                            }
                        });
                    });
            }
    }
    return tempGameFinal
}

    function assignRemaining(){
        let tempRemain = []
        let allGameFighters = []

        console.log('all game fighters', allGameFighters)
        console.log('tempRemain', tempRemain)
    }

    return(
        <div className="randomMainDiv">
            <p>this is the random page</p>
        </div>
    )
}