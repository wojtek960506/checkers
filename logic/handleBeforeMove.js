import { getBoardButtonCoordinates, showOptions } from "../utils.js";
import { getMovesAndCaptures } from "./getMovesAndCaptures.js";

const handleBeforeMove = (boardElem, board, clickedBox, isQueen, isWhite) => {
  const clicked = getBoardButtonCoordinates(clickedBox.id);
  
  const { moveOptions, captureOptions } = getMovesAndCaptures(
    board, clicked, isWhite, isQueen
  );

  // pawn cannot make a move
  if (moveOptions.length === 0 && captureOptions.length === 0) return;

  // check if there are any capturing options for other pawns
  // in case of the clicked pawn has no options to capture
  if (captureOptions.length === 0) {
    const currentlyMoving = isWhite ? ['W', 'WQ'] : ['B', 'BQ'];
    for (let [y, row] of board.entries()) {
      for (let [x, value] of row.entries()) {
        if (currentlyMoving.includes(value)) {
          const { captureOptions: tmpCaptureOptions } = getMovesAndCaptures(
            board, { x, y }, isWhite, isQueen
          );
          if (tmpCaptureOptions.length > 0) return;
        }
      }
    }
  }

  showOptions(moveOptions, 'pink');
  showOptions(captureOptions, 'red');
 
  boardElem.setAttribute('move-options', JSON.stringify(moveOptions));
  boardElem.setAttribute('capture-options', JSON.stringify(captureOptions));
  boardElem.setAttribute('move-state', 'during-move');
  boardElem.setAttribute('current-pawn', JSON.stringify(clicked));
}

const handleBeforeMoveBlack = (boardElem, board, clickedBox, isQueen = false) => {
  handleBeforeMove(boardElem, board, clickedBox, isQueen, false);
}

const handleBeforeMoveWhite = (boardElem, board, clickedBox, isQueen = false) => {
  handleBeforeMove(boardElem, board, clickedBox, isQueen, true);
}

export { handleBeforeMoveBlack, handleBeforeMoveWhite };