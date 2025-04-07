
import { createBoardButton } from "./createBoardButton.js";
import { boardClickHandler } from "../logic/boardClickHandler.js";


// we have to know the current state of board (`board`)
const drawBoard = (boardElem, board) => {
  const boardHeight = board.length;
  const boardWidth = board[0].length;

  const boardContainer = document.createElement('div');
  boardContainer.id = 'board-container';
  boardContainer.className = 'board-container';

  for (let i = 0 ; i < boardHeight ; i++) { 
    const boardRow = document.createElement('div');
    boardRow.className = 'board-row';
    
    for (let j = 0 ; j < boardWidth ; j++) {
      boardRow.appendChild(createBoardButton(board, i, j));
    }
    boardContainer.appendChild(boardRow);
  }

  boardContainer.addEventListener('click', (event) => {
    boardClickHandler(event, boardElem, board);
  });

  return boardContainer;
}

export { drawBoard };