import { consoleLogBoard } from "./consoleLogBoard.js";
import { createPawn } from "../ui/createPawn.js";
import { getBoardButtonCoordinates, getValueOnBoard, hideOptions } from "../utils.js";

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

      boardElem.setAttribute('move-state', 'before-move');
      boardElem.setAttribute('is-moving', isWhiteTurn ? 'black' : 'white');
      break;
    }
  }

  consoleLogBoard(board);
}

export { executeMove };