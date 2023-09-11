import React, { useState } from 'react';

export const Swinesweeper = () => {
	const [board, setBoard] = useState([]);

	const generateBoard = () => {
		let board = [];
		for (let i = 0; i < 10; i++) {
			let row = [];
			for (let j = 0; j < 10; j++) {
				row.push({ value: 0, clicked: false });
			}
			board.push(row);
			console.log('board: ', board);
		}

		let pigsPlaced = 0;
		while (pigsPlaced < 10) {
			let x = Math.floor(Math.random() * 10);
			let y = Math.floor(Math.random() * 10);
			if (board[x][y].value === 0) {
				board[x][y].value = '🐷';
				pigsPlaced++;

				const directions = [
					[0, 1],
					[1, 0],
					[0, -1],
					[-1, 0],
					[-1, -1],
					[-1, 1],
					[1, -1],
					[1, 1],
				];

				for (let [dx, dy] of directions) {
					const nx = x + dx;
					const ny = y + dy;
					if (
						nx >= 0 &&
						ny >= 0 &&
						nx < 10 &&
						ny < 10 &&
						board[nx][ny].value !== '🐷'
					) {
						board[nx][ny].value += 1;
					}
				}
			}
		}

		setBoard(board);
	};

	const handleClick = (x, y) => {
		if (board[x][y].value === '🐷') {
			setBoard((prevBoard) => {
				const newBoard = JSON.parse(JSON.stringify(prevBoard));
				newBoard[x][y].clicked = true;
				return newBoard;
			});

			setTimeout(() => {
				alert('You lost! Try again!');
				setBoard((prevBoard) =>
					prevBoard.map((row) =>
						row.map((cell) => ({ ...cell, clicked: true }))
					)
				);
			}, 100);
			return;
		}

		setBoard((prevBoard) => {
			const newBoard = JSON.parse(JSON.stringify(prevBoard));
			newBoard[x][y].clicked = true;
			return newBoard;
		});
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				border: '3px solid sandybrown',
			}}
		>
			<button
				onClick={generateBoard}
				style={{
					backgroundColor: 'green',
				}}
			>
				New Game
			</button>
			<div>
				{board.map((row, i) => (
					<div key={i} style={{ display: 'flex' }}>
						{row.map((cell, j) => (
							<button
								key={j}
								style={{
									width: '30px',
									height: '30px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									fontSize: '18px',
									backgroundColor: cell.clicked ? 'skyblue' : 'dodgerblue',
								}}
								onClick={() => handleClick(i, j)}
							>
								{cell.clicked ? cell.value : ''}
							</button>
						))}
					</div>
				))}
			</div>
		</div>
	);
};
