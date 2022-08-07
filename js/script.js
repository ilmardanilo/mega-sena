let state = { board: [], currentGame: [], savedGames: [] };

function start() {
    addNumberToGame(1)
    addNumberToGame(1)
    addNumberToGame(1)
    addNumberToGame(1)
    addNumberToGame(1)
    addNumberToGame(1)
    addNumberToGame(1)
    addNumberToGame(1)
    addNumberToGame(1)

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

    state.currentGame.push(numberToAdd);
}

start();