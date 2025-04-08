import { getBoardButtonCoordinates, showOptions } from "../utils.js";
import { getMovesAndCaptures } from "./getMovesAndCaptures.js";

const handleBeforeMove = (boardElem, board, clickedBox, isWhite) => {
  const clicked = getBoardButtonCoordinates(clickedBox.id);
  
  const { moveOptions, captureOptions } = getMovesAndCaptures(
    board, clicked, isWhite
  );

  // pawn cannot make a move
  if (moveOptions.length === 0 && captureOptions.length === 0) return;
  
  showOptions(moveOptions, 'pink');
  showOptions(captureOptions, 'red');
 
  boardElem.setAttribute('move-options', JSON.stringify(moveOptions));
  boardElem.setAttribute('capture-options', JSON.stringify(captureOptions));
  boardElem.setAttribute('move-state', 'during-move');
  boardElem.setAttribute('current-pawn', JSON.stringify(clicked));
}

const handleBeforeMoveBlack = (boardElem, board, clickedBox) => {
  handleBeforeMove(boardElem, board, clickedBox, false);
}

const handleBeforeMoveWhite = (boardElem, board, clickedBox) => {
  handleBeforeMove(boardElem, board, clickedBox, true);
}

export { handleBeforeMoveBlack, handleBeforeMoveWhite };