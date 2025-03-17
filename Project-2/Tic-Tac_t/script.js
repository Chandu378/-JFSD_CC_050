
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');


const gameState = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameActive: false,
    players: {
        X: { name: 'Player X', symbol: 'X' },
        O: { name: 'Player O', symbol: 'O' }
    },
    winningCombinations: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ]
};

s
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const player1Element = document.getElementById('player1');
const player2Element = document.getElementById('player2');
const restartBtn = document.getElementById('restartBtn');
const playerNameModal = document.getElementById('playerNameModal');
const playerNameForm = document.getElementById('playerNameForm');
const gameOverModal = document.getElementById('gameOverModal');
const gameOverTitle = document.getElementById('gameOverTitle');
const gameOverMessage = document.getElementById('gameOverMessage');
const newGameBtn = document.getElementById('newGameBtn');
const themeToggle = document.getElementById('themeToggle');


let leaderboardData = [];


function init() {
    
    loadLeaderboard();
    
   
    playerNameModal.style.display = 'flex';
    
    
    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });
    
    restartBtn.addEventListener('click', restartGame);
    newGameBtn.addEventListener('click', startNewGame);
    playerNameForm.addEventListener('submit', handlePlayerNameSubmit);
    themeToggle.addEventListener('click', toggleTheme);
    
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('.theme-icon').textContent = '☀️';
        themeToggle.querySelector('.theme-text').textContent = 'Light Mode';
    }
    
   
    updateStatusMessage();
    updatePlayersUI();
}


function handleCellClick(cell) {
    if (!gameState.gameActive) return;
    
    const index = cell.getAttribute('data-index');
    
    if (gameState.board[index] !== '') return;
    
    
    playSound(clickSound);
    
  
    gameState.board[index] = gameState.currentPlayer;
    cell.textContent = gameState.currentPlayer;
    cell.classList.add(gameState.currentPlayer.toLowerCase());
    
    if (checkWin()) {
        const winner = gameState.players[gameState.currentPlayer];
        updateLeaderboard(winner.name, true);
        const otherPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
        updateLeaderboard(gameState.players[otherPlayer].name, false);
        
       
        playSound(winSound);
        
        
        gameOverTitle.textContent = 'Winner!';
        gameOverMessage.textContent = `${winner.name} wins the game!`;
        gameOverModal.style.display = 'flex';
        
        gameState.gameActive = false;
    } else if (checkDraw()) {
        
        playSound(drawSound);
        
        
        gameOverTitle.textContent = 'Draw!';
        gameOverMessage.textContent = 'The game ended in a draw!';
        gameOverModal.style.display = 'flex';
        
        gameState.gameActive = false;
    } else {
        
        gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
        updateStatusMessage();
        updatePlayersUI();
    }
}


function checkWin() {
    return gameState.winningCombinations.some(combination => {
        if (
            gameState.board[combination[0]] === gameState.currentPlayer &&
            gameState.board[combination[1]] === gameState.currentPlayer &&
            gameState.board[combination[2]] === gameState.currentPlayer
        ) {
            highlightWinCombination(combination);
            return true;
        }
        return false;
    });
}


function highlightWinCombination(combination) {
    combination.forEach(index => {
        document.querySelector(`.cell[data-index="${index}"]`).classList.add('highlight');
    });
}


function checkDraw() {
    return gameState.board.every(cell => cell !== '');
}


function updateStatusMessage() {
    status.textContent = gameState.gameActive
        ? `${gameState.players[gameState.currentPlayer].name}'s turn`
        : 'Game Over!';
}


function updatePlayersUI() {
    player1Element.textContent = gameState.players.X.name;
    player2Element.textContent = gameState.players.O.name;
    
    if (gameState.gameActive) {
        player1Element.classList.toggle('active', gameState.currentPlayer === 'X');
        player2Element.classList.toggle('active', gameState.currentPlayer === 'O');
    }
}


function handlePlayerNameSubmit(event) {
    event.preventDefault();
    
    const player1Name = document.getElementById('player1Name').value.trim() || 'Player X';
    const player2Name = document.getElementById('player2Name').value.trim() || 'Player O';
    
    gameState.players.X.name = player1Name;
    gameState.players.O.name = player2Name;
    
    playerNameModal.style.display = 'none';
    startGame();
}


function startGame() {
    gameState.board = Array(9).fill('');
    gameState.currentPlayer = 'X';
    gameState.gameActive = true;
    
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
    
   
    updateStatusMessage();
    updatePlayersUI();
}


function restartGame() {
    
    playSound(clickSound);
    
    startGame();
}


function startNewGame() {
    gameOverModal.style.display = 'none';
    playerNameModal.style.display = 'flex';
}


function loadLeaderboard() {
    const storedData = localStorage.getItem('ticTacToeLeaderboard');
    if (storedData) {
        leaderboardData = JSON.parse(storedData);
    }
    updateLeaderboardUI();
}


function updateLeaderboard(playerName, isWinner) {
   
    const playerIndex = leaderboardData.findIndex(player => player.name === playerName);
    
    if (playerIndex !== -1) {
        
        if (isWinner) {
            leaderboardData[playerIndex].wins++;
        } else {
            leaderboardData[playerIndex].losses++;
        }
    } else {
        
        leaderboardData.push({
            name: playerName,
            wins: isWinner ? 1 : 0,
            losses: isWinner ? 0 : 1
        });
    }

    leaderboardData.sort((a, b) => b.wins - a.wins);
    
    
    localStorage.setItem('ticTacToeLeaderboard', JSON.stringify(leaderboardData));
    
    
    updateLeaderboardUI();
}


function updateLeaderboardUI() {
    const leaderboardBody = document.getElementById('leaderboardBody');
    leaderboardBody.innerHTML = '';
    
    if (leaderboardData.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="4" style="text-align: center;">No games played yet</td>';
        leaderboardBody.appendChild(emptyRow);
        return;
    }
    
    leaderboardData.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.wins}</td>
            <td>${player.losses}</td>
        `;
        leaderboardBody.appendChild(row);
    });
}


function toggleTheme() {
    const body = document.body;
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const themeText = themeToggle.querySelector('.theme-text');
    
   
    playSound(clickSound);
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    }
}


function playSound(soundElement) {
    try {
        soundElement.currentTime = 0;
        soundElement.play();
    } catch (error) {
        console.error('Error playing sound:', error);
    }
}


document.addEventListener('DOMContentLoaded', init);