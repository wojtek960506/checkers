import { consoleLogBoard } from "./consoleLogBoard.js";
import { createPawn } from "../ui/createPawn.js";
import { getBoardButtonCoordinates, getValueOnBoard, hideOptions, showOptions } from "../utils.js";
import { getMovesAndCaptures } from "./getMovesAndCaptures.js";

const getBeatenPawn = (board, current, move, isWhiteTurn) => {
  const beatenValue = isWhiteTurn ? 'B' : 'W';

  const stepX = current.x > move.x ? 1 : -1;
  const stepY = current.y > move.y ? 1 : -1;

  let beatenX = move.x, beatenY = move.y;
  do {
    beatenX += stepX;
    beatenY += stepY;
  } while (getValueOnBoard(board, { x: beatenX, y: beatenY }) !== beatenValue);

  return {x: beatenX, y: beatenY};
}

const removePawn = (board, pawn) => {
  document.getElementById(`board-button-${pawn.x}-${pawn.y}`).innerHTML = null;
  board[pawn.y][pawn.x] = '*';
}

const movePawn = (parent, board, from, to, isWhiteTurn) => {
  parent.appendChild(createPawn(isWhiteTurn));
  board[to.y][to.x] = isWhiteTurn ? 'W' : 'B';

  removePawn(board, from); 
}

const executeMove = (
  boardElem, board, clickedBox, currentPawn, moveOptions, captureOptions, isWhiteTurn
) => {
  const clicked = getBoardButtonCoordinates(clickedBox.id);

  for (let move of moveOptions) {
    if (move.x == clicked.x && move.y == clicked.y) {
      movePawn(clickedBox, board, currentPawn, clicked, isWhiteTurn); 
      hideOptions(moveOptions, 'pink');
      hideOptions(captureOptions, 'red');

      boardElem.setAttribute('move-state', 'before-move');
      boardElem.setAttribute('is-moving', isWhiteTurn ? 'black' : 'white');

      // after move we should check for the possibilities of
      // captures for the opponent and allow only for such moves
      // TODO

      break;
    }
  }
  for (let beating of captureOptions) {
    if (beating.x == clicked.x && beating.y == clicked.y) {
      movePawn(clickedBox, board, currentPawn, clicked, isWhiteTurn);
      hideOptions(moveOptions, 'pink');

      const beaten = getBeatenPawn(board, currentPawn, beating, isWhiteTurn);
      removePawn(board, beaten);
      hideOptions(captureOptions, 'red');

      const {
        captureOptions: tmpCaptureOptions
      } = getMovesAndCaptures(board, clicked, isWhiteTurn);
      if (tmpCaptureOptions.length > 0) {
        boardElem.setAttribute('current-pawn', JSON.stringify(clicked));
        boardElem.setAttribute('move-options', JSON.stringify([]));
        boardElem.setAttribute('capture-options', JSON.stringify(tmpCaptureOptions));
        boardElem.setAttribute('is-next-capture', ''); // boolean attribute

        showOptions(tmpCaptureOptions, 'red');
        break;
      }

      boardElem.setAttribute('move-state', 'before-move');
      boardElem.setAttribute('is-moving', isWhiteTurn ? 'black' : 'white');
      boardElem.removeAttribute('is-next-capture');
      break;
    }
  }

  consoleLogBoard(board);
}

export { executeMove };