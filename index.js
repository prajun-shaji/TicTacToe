const cellX = "x";
const cellO = "o";
let setO;
const allCells = document.querySelectorAll(`[data-cell]`);
const gridBlock = document.getElementById('container');
const combinationsToWin = [[0, 1, 2], [3, 4, 5,], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
const winnerMessageText = document.querySelector(`[data-winner-message]`);
const winnerMessageElement = document.getElementById('winnerMessage');
const restart = document.getElementById('restart');

startGame();

restart.addEventListener('click', startGame);

function startGame() {
allCells.forEach(cell => {
    cell.classList.remove(cellO);
    cell.classList.remove(cellX);
    cell.removeEventListener('click', handleClick);
     cell.addEventListener('click', handleClick, {once: true});
});
hoverMark();
winnerMessageElement.classList.remove('show');
}

function handleClick(event) {
    const cell = event.target;
    const currentMark = setO ? cellO : cellX;
    placeMark(cell, currentMark);
    if(checkWinner(currentMark)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        switchTurn();
        hoverMark();
    }
}

function isDraw() {
    return [...allCells].every(cell => {
        return cell.classList.contains(cellX) || cell.classList.contains(cellO);
    });
}

function endGame(draw) {
    if (draw) {
        winnerMessageText.innerHTML = 'Draw';
    } else {
    winnerMessageText.innerHTML = `${setO ? "Player O" : "Player X"} Wins!`;
    }
    winnerMessageElement.classList.add('show');
}

function placeMark(cell, currentMark) {
    cell.classList.add(currentMark);
}

function switchTurn() {
    setO = !setO;
}

function hoverMark() {
    gridBlock.classList.remove(cellO);
    gridBlock.classList.remove(cellX);
    if (setO) {
        gridBlock.classList.add(cellO);
    } else {
        gridBlock.classList.add(cellX);
    }
}

function checkWinner(currentMark) {
    return combinationsToWin.some(combination => {
        return combination.every(index => {
            return allCells[index].classList.contains(currentMark);
        });
    });
}