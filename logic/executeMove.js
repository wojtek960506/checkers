import { consoleLogBoard } from "./consoleLogBoard.js";
import { createPawn } from "../ui/createPawn.js";
import { getBoardButtonCoordinates, getValueOnBoard } from "../utils.js";

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


const removePawnFromBoard = (board, pawn) => {
  document.getElementById(`board-button-${pawn.x}-${pawn.y}`).innerHTML = null;
  board[pawn.y][pawn.x] = '*';
}

const pawnMove = (parent, board, from, to, isWhiteTurn) => {
  parent.appendChild(createPawn(isWhiteTurn));
  board[to.y][to.x] = isWhiteTurn ? 'W' : 'B';

  removePawnFromBoard(board, from); 
}

const executeMove = (
  boardElem, board, clickedBox, currentPawn, moveOptions, captureOptions, isWhiteTurn
) => {
  const clicked = getBoardButtonCoordinates(clickedBox.id);

  for (let move of moveOptions) {
    if (move.x == clicked.x && move.y == clicked.y) {
      boardElem.setAttribute('move-state', 'before-move');
      boardElem.setAttribute('is-moving', isWhiteTurn ? 'black' : 'white');

      

      
      // clickedBox.appendChild(createPawn(isWhiteTurn));
      // board[clicked.y][clicked.x] = isWhiteTurn ? 'W' : 'B';

      // document.getElementById(`board-button-${currentPawn[0]}-${currentPawn[1]}`).innerHTML = null;
      // board[currentPawn[1]][currentPawn[0]] = '*';
      pawnMove(clickedBox, board, currentPawn, clicked, isWhiteTurn);
      
      for (let move of moveOptions) {
        const b = document.getElementById(`board-button-${move.x}-${move.y}`);
        b.classList.remove('pink');
      }

      for (let capture of captureOptions) {
        const b = document.getElementById(`board-button-${capture.x}-${capture.y}`);
        b.classList.remove('red');
      }

      break;
    }
  }
  for (let beating of captureOptions) {
    if (beating.x == clicked.x && beating.y == clicked.y) {
      boardElem.setAttribute('move-state', 'before-move');
      boardElem.setAttribute('is-moving', isWhiteTurn ? 'black' : 'white');

      clickedBox.appendChild(createPawn(isWhiteTurn));
      board[clicked.y][clicked.x] = isWhiteTurn ? 'W' : 'B';

      document.getElementById(`board-button-${currentPawn.x}-${currentPawn.y}`).innerHTML = null;
      board[currentPawn.y][currentPawn.x] = '*';

      for (let move of moveOptions) {
        const b = document.getElementById(`board-button-${move.x}-${move.y}`);
        b.classList.remove('pink');
      }

      // add handling of beating
      // remove pawn which has been beaten
      const beaten = getBeatenPawn(board, {x: currentPawn.x, y: currentPawn.y}, beating, isWhiteTurn)

      document.getElementById(`board-button-${beaten.x}-${beaten.y}`).innerHTML = null;
      board[beaten.y][beaten.x] = '*';

      for (let beating of captureOptions) {
        const b = document.getElementById(`board-button-${beating.x}-${beating.y}`);
        b.classList.remove('red');
      }
    }
  }

  consoleLogBoard(board);
}

export { executeMove };