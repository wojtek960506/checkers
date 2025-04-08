import { getBoardButtonCoordinates } from "../utils.js";
import { getMoves } from "./getMoves.js";

const handleBeforeMove = (boardElem, board, clickedBox, isWhite) => {
  const [clickedBoxX, clickedBoxY] = getBoardButtonCoordinates(clickedBox.id);
  
  const { possibleMoves, possibleBeatings } = getMoves(
    board, clickedBoxX, clickedBoxY, isWhite
  );

  // pawn cannot make any move
  if (possibleMoves.length === 0 && possibleBeatings.length === 0) return;

  // mark possible moves on board
  for (let move of possibleMoves) {
    const b = document.getElementById(`board-button-${move[0]}-${move[1]}`);
    b.classList.add('pink');
  }

  // mark possible beatings on board
  for (let beating of possibleBeatings) {
    const b = document.getElementById(`board-button-${beating[0]}-${beating[1]}`);
    b.classList.add('red');
  }
 
  boardElem.setAttribute('possible-moves', JSON.stringify(possibleMoves));
  boardElem.setAttribute('possible-beatings', JSON.stringify(possibleBeatings));
  boardElem.setAttribute('move-state', 'during-move');
  boardElem.setAttribute('current-pawn', JSON.stringify([clickedBoxX,clickedBoxY]));
}

const handleBeforeMoveBlack = (boardElem, board, clickedBox) => {
  handleBeforeMove(boardElem, board, clickedBox, false);
}

const handleBeforeMoveWhite = (boardElem, board, clickedBox) => {
  handleBeforeMove(boardElem, board, clickedBox, true);
}

export { handleBeforeMoveBlack, handleBeforeMoveWhite };