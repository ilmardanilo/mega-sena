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

    console.log(state.currentGame);
}

function render() {
    renderBoard();
    renderButtons();
    renderSavedGames();
}

function renderBoard() {
    let divBoard = document.querySelector('#megasena-board');
    divBoard.innerHTML = '';

    let ulNumbers = document.createElement('ul');
    ulNumbers.classList.add('numbers');

    for (let i = 0; i < state.board.length; i++) {
        const currentNumber = state.board[i];
        
        let liNumber = document.createElement('li');
        liNumber.textContent = currentNumber;
        liNumber.classList.add('number');

        liNumber.addEventListener('click', handleNumberClick);

        if (isNumberInGame(currentNumber)) {
            liNumber.classList.add('selected-number');
        }

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
    render();
}

function renderButtons() {
    let divButtons = document.querySelector('#megasena-buttons')
    divButtons.innerHTML = '';
    
    const buttonNewGame = createNewGameButton();
    const buttonRandomGame = createRandomGameButton();
    const buttonSaveGame = createSaveGameButton();

    divButtons.appendChild(buttonNewGame);
    divButtons.appendChild(buttonRandomGame);
    divButtons.appendChild(buttonSaveGame);
}

function createNewGameButton() {
    const button = document.createElement('button');
    button.textContent = 'Novo jogo';

    button.addEventListener('click', newGame);

    return button; 
}

function createRandomGameButton() {
    const button = document.createElement('button');
    button.textContent = 'Jogo aleatório';

    button.addEventListener('click', randomGame);

    return button;
}

function createSaveGameButton() {
    const button = document.createElement('button');
    button.textContent = 'Salvar jogo';
    button.disabled = !isGameComplete();

    button.addEventListener('click', saveGame);

    return button;
}

function renderSavedGames() {
    let divSavedGames = document.querySelector('#megasena-saved-games')
    divSavedGames.innerHTML = '';

    if (state.savedGames.length === 0) {
        divSavedGames.innerHTML = '<p>Nenhum jogo salvo.</p>';
    } else {
        let ulSavedGames = document.createElement('ul');

        for (let i = 0; i < state.savedGames.length; i++) {
            const element = state.savedGames[i];
            
            let liGame = document.createElement('li');
            liGame.textContent = element.sort((a, b) => a - b).join(' ');

            ulSavedGames.appendChild(liGame);
        }

        divSavedGames.appendChild(ulSavedGames);
    }
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

    newGame();
}

function isGameComplete() {
    return state.currentGame.length === 6;
}

function resetGame() {
    state.currentGame = [];
}

function randomGame() {
    resetGame();
    
    while (!isGameComplete()) {
        let randomNumber = Math.ceil(Math.random() * 60);
        addNumberToGame(randomNumber);
    }

    render();
}

start();