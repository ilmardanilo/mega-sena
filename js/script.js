let state = { board: [], currentGame: [], savedGames: [] };

function start() {
    createBoard();
    newGame();

}

function createBoard() {
    state.board = [];

    for (let index = 1; index <= 60; index++) {
        state.board.push(index);
    }
}

function newGame() {
    resetGame();
    render();
}

function render() {
    renderBoard();
}

function renderBoard() {
    let divBoard = document.querySelector('#megasena-board');
    divBoard.innerHTML = '';

    let ulNumbers = document.createElement('ul');

    for (let i = 0; i < state.board.length; i++) {
        const currentNumber = state.board[i];
        
        let liNumber = document.createElement('li');
        liNumber.textContent = currentNumber;

        liNumber.addEventListener('click', handleNumberClick);

        ulNumbers.appendChild(liNumber);
    }

    divBoard.appendChild(ulNumbers);
}

function handleNumberClick(event) {
    let liValue = Number(event.target.textContent);

    if (isNumberInGame(liValue)) {
        removeNumberFromGame(liValue);
    } else {
        addNumberToGame(liValue);
    }

    console.log(state.currentGame);
}

function addNumberToGame(numberToAdd) {
    if (numberToAdd < 1 || numberToAdd > 60) {
        console.error('Número inválido', numberToAdd);
        return;
    }

    if (state.currentGame.length > 5) {
        console.error('O jogo já está completo.');
        return;
    }

    if (isNumberInGame(numberToAdd)) {
        console.error('Este número já está no jogo.', numberToAdd);
        return;
    }

    state.currentGame.push(numberToAdd);
}

function removeNumberFromGame(numberToRemove) {
    let newGame = [];

    for (let index = 0; index < state.currentGame.length; index++) {
        const currentNumber = state.currentGame[index];

        if (currentNumber === numberToRemove) {
            continue;
        }

        newGame.push(currentNumber);
    }

    state.currentGame = newGame;
}

function isNumberInGame(numberToCheck) {
    return state.currentGame.includes(numberToCheck);
}

function saveGame() {
    if (!isGameComplete()) {
        console.error('O jogo não está completo.');
        return;
    }

    state.savedGames.push(state.currentGame);
}

function isGameComplete() {
    return state.currentGame.length === 6;
}

function resetGame() {
    state.currentGame = [];
}

start();