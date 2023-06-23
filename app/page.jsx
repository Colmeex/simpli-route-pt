"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import birdHouse from "./Images/casaPajaros.png";
import blueBird from "./Images/aveAzul.png";
import roseBird from "./Images/aveRosa.png";

export default function Home() {

	const [house, setHouse] = useState(true);
	const [birds, setBirds] = useState([
		{ id: 1, color: "pink", clicked: false },
		{ id: 2, color: "blue", clicked: false },
		{ id: 3, color: "pink", clicked: false },
		{ id: 4, color: "blue", clicked: false },
		{ id: 5, color: "pink", clicked: false },
		{ id: 6, color: "blue", clicked: false },
		{ id: 7, color: "pink", clicked: false },
		{ id: 8, color: "blue", clicked: false },
		{ id: 9, color: "pink", clicked: false },
	]);	
	const [birds2, setBirds2] = useState([
		{ id: 1, color: "pink", clicked: false },
		{ id: 2, color: "blue", clicked: false },
		{ id: 3, color: "pink", clicked: false },
		{ id: 4, color: "blue", clicked: false },
		{ id: 5, color: "pink", clicked: false },
		{ id: 6, color: "blue", clicked: false },
		{ id: 7, color: "pink", clicked: false },
		{ id: 8, color: "blue", clicked: false },
		{ id: 9, color: "pink", clicked: false },
	]);
	const [score, setScore] = useState(0);
	const [time, setTime] = useState(60);
	const [gameOver, setGameOver] = useState(false);

	//Tiempo
	useEffect(() => {
		const timer = setInterval(() => {
			setTime((prevTime) => prevTime - 1);
		}, 1000);

		if (time === 0) {
			setGameOver(true);
			clearInterval(timer);
		}

		return () => {
			clearInterval(timer);
		};
	}, [time]);
	//sumar punto cuando se hace click en aves
	const handleClick = (id, color) => {
		if (color === "pink" && !gameOver) {
			setScore((prevScore) => prevScore + 1);
		} else if (color === "blue" && !gameOver) {
			setScore((prevScore) => prevScore + 1);
		}

		setBirds((prevBirds) =>
			prevBirds.map((bird) => {
				if (bird.id === id) {
					return { ...bird, clicked: true };
				}
				return bird;
			})
		);
	};
	//Boton para reiniciar
	const handlePlayAgain = () => {
		setScore(0);
		setTime(60);
		setGameOver(false);
		setBirds((prevBirds) =>
			prevBirds.map((bird) => ({ ...bird, clicked: false }))
		);
	};

	return (
		<main className="flex min-h-screen flex-col items-center  p-24 text-slate-900">
				<div>
				<p>Score: {score}</p>
				<p>Time: {time}</p>
				{gameOver && (
					<button className="mt-4" onClick={handlePlayAgain}>
						Play Again
					</button>
				)}
			</div>
			<div className="grid grid-cols-3 gap-4 mt-8 ">
				{time === 60
					? birds.map((bird) => (
							<div
								key={bird.id}
								className={`flex items-center justify-center h-32 w-32 bg-${
									bird.color
								}-${bird.clicked ? "400" : "500"}`}
								onClick={() => handleClick(bird.id, bird.color)}
							>
								<Image
									src={birdHouse}
									alt={`Casa-Pájaro ${bird.id}`}
									className="h-full"
								/>
							</div>
					))
					: 
					birds.map((birds2) => (
							<div
								key={birds2.id}
								className={`flex items-center justify-center h-32 w-32 bg-${
									birds2.color
								}-${birds2.clicked ? "400" : "500"}`}
								onClick={() => handleClick(birds2.id, birds2.color)}
							>
								<Image
									src={
										birds2.id === 2 ||
										birds2.id === 4 ||
										birds2.id === 6 || 
										birds2.id === 8 ? blueBird : roseBird
									}
									alt={`Casa-Pájaro ${birds.id}`}
									className="h-full"
								/>
							</div>
					))}
			</div>

		</main>
	)
}
