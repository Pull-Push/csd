import { React, useState, useEffect } from "react";
import { toonData } from "../data/toondata";

const data = toonData;

export default function TestDashboard() {
	return (
		<div className="testDashboardMain">
			{data.map((data, key) => (
				<div className="toonDiv" key={key}>
					<p>{data.id}</p>
					<p>{data.name}</p>
					<img src={require(`../static/imgs/SMALL_PHOTO/${data.name}.jpg`)} alt={data.name} />
					<img src={require(`../static/imgs/LARGE_PHOTO/${data.name}_BIG.jpg`)} alt={data.name} />
				</div>
			))}
		</div>
	);
}
