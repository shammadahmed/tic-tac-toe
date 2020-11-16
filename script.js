
		const gameBoard = (() => {

			let boxes = [];

			const getBoxes = () => boxes;

			const addBox = (box, index) => boxes[index] = box;

			const reintialize = () => {
				boxes = [];
				document.querySelectorAll('.box').forEach(box => {
					box.textContent = '';
					box.style.backgroundColor = '#d1d8e0';
				});


				displayController.clearMessageBox();
			};

			return { getBoxes, addBox, reintialize };

		})();

		const player = () => {

			return {};
		};

		const gamePlay = (() => {

			let currentPlayer = 'x',
				over = false,
				winningCondition;

			const winConditions = [
				[0,1,2], [3,4,5], [6,7,8],
				[0,3,6], [1,4,7], [2,5,8],
				[0,4,8], [2,4,6]
			];

			const isOver = () => over;

			const changeCurrentPlayer = () => currentPlayer = currentPlayer === 'x' ? 'o' : 'x';

			const listenClicks = () => {
				document.querySelectorAll('.box').forEach(box => {
					box.addEventListener('click', () => {
						if (!box.textContent && !over) {
							box.textContent = currentPlayer;
							gameBoard.addBox(currentPlayer, box.dataset.box);

							checkIsOver();

							if(isOver()) {
								displayController.highlight(winningCondition);
								displayController.congratulate(currentPlayer);
							}

							changeCurrentPlayer();
						}
					});
				});
			}

			const checkIsOver = () => {
				let boxes = gameBoard.getBoxes();

				winConditions.some(c => {
					if (boxes[c[0]] === boxes[c[1]] && boxes[c[1]] === boxes[c[2]] && boxes[c[1]]) {
						over = true;
						winningCondition = c;

						return true;
					}
				});
			};

			const restart = () => {
				currentPlayer = 'x',
				over = false,
				winningCondition = undefined;

				gameBoard.reintialize();
			};

			return { listenClicks, restart };

		})();

		const displayController = (() => {

			const game = document.getElementById('game');

			const highlight = condition => {
				boxesToHighlight = [];

				condition.forEach(index => {
					boxesToHighlight.push(document.querySelector(`.box[data-box="${index}"]`));
				});

				boxesToHighlight.forEach(box => box.style.backgroundColor = '#26de81')
			};

			const congratulate = player => {
				document.getElementById('messageBox').textContent = `${player.toUpperCase()} has won!`;
			}

			const clearMessageBox = () => document.getElementById('messageBox').textContent = ``;

			const addNames = e => {
				e.preventDefault();
				let firstPlayer = document.getElementById('first').value;
				let secondPlayer = document.getElementById('second').value;
				document.getElementById('messageBox').textContent = `${firstPlayer} is 'X' and ${secondPlayer} is 'O'`;
				document.getElementById('addNamesButton').textContent = 'Change names';
			};

			const render = () => {
				board = document.createElement('section')
				board.setAttribute('id', 'board');

				for (let i = 0; i <= 8; i++) {

					let span = document.createElement('span');
					span.classList.add('box');
					span.dataset.box = i;

					board.appendChild(span);
				}

				restartButton = document.createElement('button')
				restartButton.setAttribute('id', 'restart');
				restartButton.textContent = 'Restart';
				restartButton.addEventListener('click', gamePlay.restart);

				messageBox = document.createElement('p');
				messageBox.setAttribute('id', 'messageBox');
				messageBox.textContent;

				namesForm = document.createElement('form');

				firstNameInput = document.createElement('input');
				firstNameInput.setAttribute('id', 'first');
				firstNameInput.setAttribute('placeholder', 'First player\'s name');

				secondNameInput = document.createElement('input');
				secondNameInput.setAttribute('id', 'second');
				secondNameInput.setAttribute('placeholder', 'Second player\'s name');

				addNamesButton = document.createElement('button');
				addNamesButton.setAttribute('id', 'addNamesButton');
				addNamesButton.textContent = 'Add names';
				addNamesButton.addEventListener('click', addNames);

				namesForm.appendChild(firstNameInput);
				namesForm.appendChild(secondNameInput);
				namesForm.appendChild(addNamesButton);

				game.appendChild(restartButton);
				game.appendChild(namesForm);
				game.appendChild(messageBox);
				game.appendChild(board);
			}

			return { render, highlight, congratulate, clearMessageBox };

		})();

		displayController.render();

		gamePlay.listenClicks();