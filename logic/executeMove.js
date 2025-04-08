import { consoleLogBoard } from "./consoleLogBoard.js";
import { createPawn } from "../ui/createPawn.js";
import { getBoardButtonCoordinates } from "../utils.js";

const getBeatenPawn = (board, currentX, currentY, moveX, moveY, isWhiteTurn) => {
  const beatenValue = isWhiteTurn ? 'B' : 'W';

  const stepX = currentX > moveX ? 1 : -1;
  const stepY = currentY > moveY ? 1 : -1;

  let beatenX = moveX, beatenY = moveY;
  do {
    beatenX += stepX;
    beatenY += stepY;
  } while (getValueOnBoard(board, beatenX, beatenY) !== beatenValue);

  return [beatenX, beatenY];
}



const executeMove = (
  boardElem, board, clickedBox, currentPawn, possibleMoves, possibleBeatings, isWhiteTurn
) => {
  const [clickedBoxX, clickedBoxY] = getBoardButtonCoordinates(clickedBox.id);

  for (let move of possibleMoves) {
    if (move[0] == clickedBoxX && move[1] == clickedBoxY) {
      boardElem.setAttribute('move-state', 'before-move');
      boardElem.setAttribute('is-moving', isWhiteTurn ? 'black' : 'white');

      
      clickedBox.appendChild(createPawn(isWhiteTurn));
      board[clickedBoxY][clickedBoxX] = isWhiteTurn ? 'W' : 'B';

      document.getElementById(`board-button-${currentPawn[0]}-${currentPawn[1]}`).innerHTML = null;
      board[currentPawn[1]][currentPawn[0]] = '*';
      
      for (let move of possibleMoves) {
        const b = document.getElementById(`board-button-${move[0]}-${move[1]}`);
        b.classList.remove('pink');
      }

      for (let beating of possibleBeatings) {
        const b = document.getElementById(`board-button-${beating[0]}-${beating[1]}`);
        b.classList.remove('red');
      }

      break;
    }
  }
  for (let beating of possibleBeatings) {
    if (beating[0] == clickedBoxX && beating[1] == clickedBoxY) {
      boardElem.setAttribute('move-state', 'before-move');
      boardElem.setAttribute('is-moving', isWhiteTurn ? 'black' : 'white');

      clickedBox.appendChild(createPawn(isWhiteTurn));
      board[clickedBoxY][clickedBoxX] = isWhiteTurn ? 'W' : 'B';

      document.getElementById(`board-button-${currentPawn[0]}-${currentPawn[1]}`).innerHTML = null;
      board[currentPawn[1]][currentPawn[0]] = '*';

      for (let move of possibleMoves) {
        const b = document.getElementById(`board-button-${move[0]}-${move[1]}`);
        b.classList.remove('pink');
      }

      // add handling of beating
      // remove pawn which has been beaten
      const [beatenX, beatenY] = getBeatenPawn(board, currentPawn[0], currentPawn[1], beating[0], beating[1], isWhiteTurn)

      // const [beatenX, beatenY] = [2,3];
      document.getElementById(`board-button-${beatenX}-${beatenY}`).innerHTML = null;
      board[beatenY][beatenX] = '*';

      for (let beating of possibleBeatings) {
        const b = document.getElementById(`board-button-${beating[0]}-${beating[1]}`);
        b.classList.remove('red');
      }
    }
  }

  consoleLogBoard(board);
}

export { executeMove };