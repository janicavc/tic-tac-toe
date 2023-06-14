// *-- constants --* //
const COLORS = {
    'null': 'white',
    '1': 'plum',
    '2': 'gold'
};

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// *-- state variables --* //
let board; // array of 3 colums
let turn; // 1 or 2
let winner; // null= no winner; 1 or 2 winner; 'Tie' = tie game

// *-- cached elements --* //
const message = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');

// *-- event listeners --* //
document.getElementById('board').addEventListener('click', playerChoice);
playAgainBtn.addEventListener('click', initialize);

// *-- functions --* //
initialize();

function initialize() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    turn = 1;
    winner = null;
    render();
}

function playerChoice(evt) {
    const idx = parseInt(evt.target.id.replace('slot-', ''));
    if (isNaN(idx) || board[idx] || winner) return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
}

function getWinner () {
    // for (let i = 0; i < winningCombos.length; i++) {
    //     if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3)
    //     return board[winningCombos[i][0]];
    // }
    if (board.includes(null)) return null;
}

function render() {
    renderBoard();
    renderMessage();
    renderControls();
}

function renderBoard() {
    board.forEach(function(slotVal, idx) {
        const slotEl = document.getElementById(`slot-${idx}`);
        slotEl.style.backgroundColor = COLORS[slotVal];
        });
}

function renderMessage() {
    if (winner === 'Tie') {
        message.innerText = "It's a Tie!";
    } else if (winner) {
        message.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!!!`;
    } else {
        message.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
    }
}

function renderControls() {
    playAgainBtn.style.visibility = winner ? 'visible': 'hidden';
}
