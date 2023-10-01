/*----- constants -----*/
const MARKERS = {
'0': null,
'1': 'X',
'-1': 'O',
};

/*----- state variables -----*/
let board;  // array of 7 column arrays
let turn;  // 1 or -1
let winner;  // null = no winner; 1 or -1 = winner; 'T' = Tie
let numRows = 3;
let numCols = 3;

/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const divEls = document.querySelectorAll('div');

/*----- event listeners -----*/
divEls.forEach(div => {
    div.addEventListener('click', inputMarker);
});

playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init();

// Initialize all state, then call render()
function init() {


// To visualize the board's mapping to the DOM,
// rotate the board array 90 degrees counter-clockwise
board = [
    [0, 0, 0],  // col 0
    [0, 0, 0],  // col 1
    [0, 0, 0],  // col 2
];

turn = 1;
winner = null;
render();
}

// In response to use interaction, update all impacted
// state, then call render();
function inputMarker(evt) {
    const cellId = evt.target.id;
    const [colIdx, rowIdx] = cellId.match(/\d+/g).map(Number);

    if (board[colIdx][rowIdx] !== 0 || winner) return;

    board[colIdx][rowIdx] = turn;
    turn *= -1;
    checkWin(colIdx, rowIdx);
    render();
}

function checkWin(colIdx, rowIdx) {
    if (checkVerticalWin(colIdx, rowIdx) || checkHorizontalWin(colIdx, rowIdx) || checkDiagonalWin(colIdx, rowIdx)) {
        winner = board[colIdx][rowIdx];
    }
}

function checkVerticalWin(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
    for (let i = 0; i < numCols; i++) {
        if (board[i][rowIdx] !== player) return false;
    }
    return true;
}

function checkHorizontalWin(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
    for (let i = 0; i < numRows; i++) {
        if (board[colIdx][i] !== player) return false;
    }
    return true;
}

function checkDiagonalWin(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
    return false;
}

// Visualize all state in the DOM
function render() {
    renderBoard();
    renderMessage();

    // Hide/show UI elements (controls)
    // renderControls();
}

function renderBoard() {
board.forEach(function(colArr, colIdx) {
    // Iterate over the cells in the cur column (colArr)
    colArr.forEach(function(cellVal, rowIdx) {
    const cellId = `c${colIdx}r${rowIdx}`;
    const cellEl = document.getElementById(cellId);
    cellEl.innerHTML = cellVal === 1 ? 'X' : cellVal === -1 ? 'O' : ''; // Display 'X' for 1 and 'O' for -1
    });
});
}

function renderMessage() {
    if (winner) {
        messageEl.innerHTML = `<span style="color: ${MARKERS[winner]}">${MARKERS[winner]}</span> Wins!`;
    } else {
        messageEl.innerHTML = `<span style="color: ${MARKERS[turn]}">${MARKERS[turn]}'s Turn</span>`;
    }
}

// function renderControls() {
//     playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
// }