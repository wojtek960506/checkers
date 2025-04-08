import { getBoardButtonCoordinates } from "../utils.js";
import { getMovesAndCaptures } from "./getMovesAndCaptures.js";

const handleBeforeMove = (boardElem, board, clickedBox, isWhite) => {
  const [clickedX, clickedY] = getBoardButtonCoordinates(clickedBox.id);
  
  const { moveOptions, captureOptions } = getMovesAndCaptures(
    board, clickedX, clickedY, isWhite
  );

  // pawn cannot make a move
  if (moveOptions.length === 0 && captureOptions.length === 0) return;

  // mark possible moves on board
  for (let move of moveOptions) {
    const b = document.getElementById(`board-button-${move[0]}-${move[1]}`);
    b.classList.add('pink');
  }

  // mark possible beatings on board
  for (let beating of captureOptions) {
    const b = document.getElementById(`board-button-${beating[0]}-${beating[1]}`);
    b.classList.add('red');
  }
 
  boardElem.setAttribute('possible-moves', JSON.stringify(moveOptions));
  boardElem.setAttribute('possible-beatings', JSON.stringify(captureOptions));
  boardElem.setAttribute('move-state', 'during-move');
  boardElem.setAttribute('current-pawn', JSON.stringify([clickedX,clickedY]));
}

const handleBeforeMoveBlack = (boardElem, board, clickedBox) => {
  handleBeforeMove(boardElem, board, clickedBox, false);
}

const handleBeforeMoveWhite = (boardElem, board, clickedBox) => {
  handleBeforeMove(boardElem, board, clickedBox, true);
}

export { handleBeforeMoveBlack, handleBeforeMoveWhite };