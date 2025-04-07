import { createPawn } from "./createPawn.js";
import { isWhite } from "../utils.js";


// i - column, j - row
const createBoardButton = (board, i, j) => {
  const boardButton = document.createElement('button');
      
  boardButton.id = `board-button-${j}-${i}` // (x (j) - row, y - (i) column)
  boardButton.className = 'board-button';

  if (!isWhite(i, j)) boardButton.classList.add('board-black');
  else boardButton.classList.add('board-white');

  if (board[i][j] == 'W') boardButton.appendChild(createPawn(true));
  if (board[i][j] == 'B') boardButton.appendChild(createPawn(false));
  return boardButton;
}

export { createBoardButton };