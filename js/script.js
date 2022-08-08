let state = { board: [], currentGame: [], savedGames: [] };

function start() {
    addNumberToGame(1)
    addNumberToGame(10)
    addNumberToGame(14)
    addNumberToGame(21)
    addNumberToGame(33)
    addNumberToGame(41)

    console.log(state.currentGame);
    console.log(state.savedGames);
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

start();