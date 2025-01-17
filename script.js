// Select the gameboard using Get Element by Id 
const gameboard = document.getElementById('gameboard');

// Set up the game board dynamically
for (let i = 1; i <= 9; i++) {
    const cell = document.createElement('div'); // This creates a new div
    cell.classList.add('col'); // Add the class of 'col' to the 
 //   cell.textContent = i; // Add the cell number to test and confirm layout
    gameboard.appendChild(cell); // Append the cell to the gameboard
}

const cells = document.querySelectorAll('#gameboard .col');  //querySelector returns a NodeList which operates similar to an Array
let isPlayerOneTurn = true;
let gameActive = true;
const resetButton = document.getElementById('resetButton');  //define reset button
resetButton.addEventListener('click', resetGame)

function resetGame(){
    gameActive = true;
    isPlayerOneTurn = true;
    board = Array(9).fill('');
    cells.forEach(cell => {
        cell.textContent= '';
    });
    updateTurnDisplay();
    resetButton.classList.add('d-none');
}

cells.forEach((cell, index) =>{ //Added an index parameter to the function so that the board state is updated after each turn
    cell.addEventListener('click', function(){
        if(!gameActive || cell.textContent !=='')return;  //Prevents writing over a cell AND removes funcctionality from the gamebaord 
        
        cell.textContent = isPlayerOneTurn ? 'X': 'O';  //just learned about ternary operator's so used one here instead of an if/else statement 
        board[index] = cell.textContent;
         
        const winner = checkWinner();

        if(winner){
            const turnDisplay = document.getElementById('turnDisplay');
            turnDisplay.textContent = `Player ${winner === 'X'? 1:2} wins!`;
            gameActive= false;
    
            resetButton.classList.remove('d-none'); //make Reset Button display after winner is declared
        }else if (checkTie()){
            const turnDisplay = document.getElementById('turnDisplay');
            turnDisplay.textContent = `No one likes a tie, let's Play Again!`;
            gameActive= false;
            resetButton.classList.remove('d-none');
        }
        else{
            isPlayerOneTurn = !isPlayerOneTurn; //No winner so we switch turns
            updateTurnDisplay(); //Update whose turn it is
        }
    });
});

function updateTurnDisplay() {
    const turnDisplay = document.getElementById('turnDisplay');
    turnDisplay.textContent = `It's Player ${isPlayerOneTurn ? 1 : 2}'s Turn`;  //A template literal and a ternary operator to display whose turn it is
}

//Creating the empty board using the .fill() method to add empty strings
let board = Array(9).fill('');


// Defining all 8 winning scenarios (ties will be later)
const winningCombinations = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // center column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6]  // diagonal
];


//Function that needs to iterate through the winning combo's and check for a match
function checkWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

function checkTie(){
    return board.every(cell => cell !== '');
}        
        
// Here is where we check if all three cells are filled with the same symbol ('X' or 'O')
        if (board[a] === board[b] && board[b] === board[c] && board[a] !== '') {
            return board[a]; // Return the winner ('X' or 'O')
        }
    }
    return null; // No winner yet
}

