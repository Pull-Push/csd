import { toonData } from "../data/toondata";

export function randomizeSetup(gameinfo) {
	let noneSelect = []
	for(let x of toonData){
		noneSelect.push(x.name)
	}
	// console.log("gameinfo from randomizeSetup", gameinfo);
	let tempGameFinal = gameinfo;
	for (let x = 0; x < tempGameFinal.length; x++) {
		let rands = [];
		if(tempGameFinal[x].chosen_fighters.length === 0){
			for(let y of noneSelect){
			rands.push([Math.random(), y]);
			tempGameFinal[x].random = rands;
			tempGameFinal[x].random.sort(); //THIS WORKS TO SORT EACH RANDOMIZED ARRAY!!!
			}
		} else{
		for (let y of tempGameFinal[x].chosen_fighters) {
			rands.push([Math.random(), y]);
			tempGameFinal[x].random = rands;
			tempGameFinal[x].random.sort(); //THIS WORKS TO SORT EACH RANDOMIZED ARRAY!!!
		}
	}
	}
	// console.log('temp game final', tempGameFinal)
	duplicateRemover(tempGameFinal);
	assignRemaining(tempGameFinal);
	// console.log("temp game final after assigning", tempGameFinal);
	return tempGameFinal;
}

function duplicateRemover(tempGameFinal) {
	// console.log("duplicateRemove is running");
	for (let x = 0; x < tempGameFinal.length - 1; x++) {
		// console.log('comparing this list', tempGameFinal[x])
		for (let y = x + 1; y < tempGameFinal.length; y++) {
			// console.log('to this list', tempGameFinal[y])
			tempGameFinal[x].random.forEach((fighterx) => {
				tempGameFinal[y].random.forEach((fighterY) => {
					if (
						fighterx[1] === fighterY[1] &&
						fighterx[0] < fighterY[0]
					) {
						// console.log('FOUND A MATCH! X SIDE WINS');
						// console.log('x fighter', fighterx, 'y fighter', fighterY)
						tempGameFinal[y].random = tempGameFinal[
							y
						].random.filter((fighter) => fighter !== fighterY);
						// console.log('after removal', tempGameFinal[y])
					} else if (
						fighterx[1] === fighterY[1] &&
						fighterx[0] > fighterY[0]
					) {
						// console.log('FOUND A MATCH! Y SIDE WINS');
						// console.log('x fighter', fighterx, 'y fighter', fighterY)
						tempGameFinal[x].random = tempGameFinal[
							x
						].random.filter((fighter) => fighter !== fighterx);
						// console.log('after removal', tempGameFinal[x])
					}
				});
			});
		}
	}
	// console.log("duplicateRemove ends");
	return tempGameFinal;
}

function assignRemaining(tempGameFinal) {
	// console.log("assign remain run");
	const allFighters = toonData;

	//BUILDOUT REMAINING FIGHTER LIST
	let tempRemaining = [];
	const totalMatches = Math.floor(83 / tempGameFinal.length);
	// console.log('Total Matches', totalMatches)
	allFighters.forEach((toon) => tempRemaining.push(toon.name));
	// console.log('tempRemaining before', tempRemaining)
	tempGameFinal.forEach((indy) => {
		// console.log('fighter length', indy.random.length)
		indy.random.forEach((fighterToRemove) => {
			// console.log('indy', indy, 'fighter', fighterToRemove[1])
			tempRemaining = tempRemaining.filter(
				(fighter) => fighter !== fighterToRemove[1]
			);
		});
	});
	// RANDOMIZE REMAINING FIGHTERS
	let currentIndex = tempRemaining.length;
	while (currentIndex !== 0) {
		// Pick a remaining element...
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[tempRemaining[currentIndex], tempRemaining[randomIndex]] = [
			tempRemaining[randomIndex],
			tempRemaining[currentIndex],
		];
	}
	// console.log('temp remaining', tempRemaining)

	// BUILD UP REMAINING PLAYER POOL
	tempGameFinal.forEach((indy) => {
		if (indy.random.length > totalMatches) {
			let toBeSpliced = indy.random.length - totalMatches;
			// console.log(indy.name, 'TOO MANY FIGHTERS BY', toBeSpliced)
			let excess = indy.random.splice(totalMatches, toBeSpliced);
			// console.log('excess', excess)
			excess.forEach((overflow) => tempRemaining.push(overflow[1]));
		}
	});

	// EVEN OUT PLAYER LISTS
	tempGameFinal.forEach((indy) => {
		if (indy.random.length < totalMatches) {
			let toBeAdded = totalMatches - indy.random.length;
			// console.log(indy.name, 'has too few fighters by', toBeAdded)
			let addedFighters = tempRemaining.splice(0, toBeAdded);
			// console.log('added fighters', addedFighters)
			addedFighters.forEach((fighter) => {
				indy.random.push([Math.random(), fighter]);
			});
		}
	});
	// console.log('temp remaining after cut', tempRemaining)
	// console.log('tempGameFinal after adding', tempGameFinal)
	// console.log("assign remain end", tempGameFinal);
}
