import { React, useState, useEffect } from "react";
import { toonData } from "../data/toondata";
import styles from '../static/css/Dashboard.module.css'
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
	const [selected, setSelected ] =useState(0)
	const [playerList, setPlayerList ] = useState([{'id':1, 'name':'Player 1', 'chosen_fighters':[], 'wins':0}, {'id':2, 'name':'Player 2', 'chosen_fighters':[], 'wins':0}]);
	const navigate = useNavigate();


	useEffect(() =>{
		// console.log('current player list is', playerList)
		// console.log('currently editing position', playerList[selected])
	}, [playerList, selected])


	function handlePlayerChange(e){
		let tempGameFighters = []
		for(let x = 1; x<=e.target.value; x++){
			let gameFighter = {
				'id': x,
				'name' : 'Player ' + x,
				'chosen_fighters' : [], 
				'wins':0
			}
			tempGameFighters.push(gameFighter)
		}
		setPlayerList(tempGameFighters)
	}

	function handleSelect(e){
		let currentlySelected = e.target.value
		setSelected(currentlySelected)
		console.log('in select handler', selected)
	}


	function handleClick(e){
		setPlayerList(oldList => {
        // Create a copy of the player list
        const newList = [...oldList];
        // Create a copy of the player object to avoid mutating state directly
        const updatedPlayer = { ...newList[selected] };
        if (!updatedPlayer.chosen_fighters.includes(e)) {
            updatedPlayer.chosen_fighters = [...updatedPlayer.chosen_fighters, e];
        } else {
            updatedPlayer.chosen_fighters = updatedPlayer.chosen_fighters.filter(fighter => fighter !== e);
        }
        newList[selected] = updatedPlayer;
        return newList;
    });
	}

	function handleSave(){
		navigate('/game' , {state:playerList})
	}

	return (
		<div className={styles.dashboardMain}>
			<img id={styles.headerLogo} src={require("../static/imgs/assets/logo_header.png")} alt="header" />
			<label className={styles.playerCount} htmlFor="playerCount">How Many Players</label>
			<select name="playerCount" id="playerCount" onChange={(e) => handlePlayerChange(e)}>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
			</select>

			<div className={styles.playerDiv}> 
			{playerList.map((player, key) => (
				<div className={styles.playerIndyDiv} key={key}>
					<h2 className={styles[`player${player.id}`]}>{player.name}</h2>
					<label className={styles.selected} htmlFor="selected">SELECT</label>
					<input type="radio" name="selected" id={styles.playerSelect} value={key} onClick={(e) => handleSelect(e)}/>
					<div className={styles.playerToonContainerDiv}>
					{player.chosen_fighters.map((toon, index) => (
						<div className={styles.playerToonDiv} key={index}>
								<p>{index+1}) {toon}</p>
							</div>
					))}
					</div>

				</div>
			))}
			</div>
			<button className={styles.startButton} onClick={handleSave}>START SMASHDOWN</button>
		<div className={styles.fighterMain}>
			{toonData.map((data, key) => (
				<div className={styles.toonDiv} key={key} onClick={() => handleClick(data.name)}>
					{/* <p>{data.id}</p> */}
					<img className={styles.toonAvatar} src={require(`../static/imgs/SMALL_PHOTO/${data.name}.jpg`)} alt={data.name} />
					<p>{data.name.toLocaleUpperCase()}</p>
				</div>
			))}
		</div>
			</div>
	);
}
