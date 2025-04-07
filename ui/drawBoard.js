import { consoleLogBoard } from "../logic/consoleLogBoard.js";


const isWhite = (row, column) => (row + column) % 2 === 0;

// we have to know the current state of board (`board`)
// we have to know which color is now moving (`whoseTurn`)
// we have to know the current state of move (`moveState`)
//   - is pawn to be clicked
//   - has pawn been clicked
//   - has pawn be moved
const drawBoard = (board, whoseTurn, moveState) => {
  const boardHeight = board.length;
  const boardWidth = board[0].length;

  const boardContainer = document.createElement('div');
  boardContainer.id = 'board-container';
  boardContainer.className = 'board-container';

  for (let i = 0 ; i < boardHeight ; i++) {
    
    const boardRow = document.createElement('div');
    boardRow.className = 'board-row';
    
    for (let j = 0 ; j < boardWidth ; j++) {
      const boardButton = document.createElement('button');
      
      boardButton.id = `board-button-${j}-${i}` // (x (j) - row, y - (i) column)
      boardButton.className = 'board-button';
      boardButton.x = j;
      boardButton.y = i;
      if (!isWhite(i, j)) {       
        boardButton.classList.add('board-black');
      } else {
        boardButton.classList.add('board-white');
    }

      if (board[i][j] == 'W') {
        const whitePawn = document.createElement('div');
        whitePawn.classList.add('pawn', 'white');
        boardButton.appendChild(whitePawn);
      }
      if (board[i][j] == 'B') {
        const blackPawn = document.createElement('div');
        blackPawn.classList.add('pawn', 'black');
        boardButton.appendChild(blackPawn);
      }
      boardRow.appendChild(boardButton);
    }
    boardContainer.appendChild(boardRow);
  }

  boardContainer.addEventListener('click', (event) => {
    // if we clicked pawn we need to get 



    console.log(event.target.parentElement);
    console.log(event.target.id);
    if (/^board-button-/.test(event.target.id)) {
      console.log('maczuje');
    }
    if ('')
    console.log(event.target.classList);
    console.log('x', event.target.x);
    console.log('y', event.target.y);

    // consoleLogBoard(board);
  })

  return boardContainer;
}

export { drawBoard };