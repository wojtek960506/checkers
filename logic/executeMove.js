import { consoleLogBoard } from "./consoleLogBoard.js";
import { createPawn } from "../ui/createPawn.js";
import { getBoardButtonCoordinates, getValueOnBoard, hideOptions, showOptions } from "../utils.js";
import { getMovesAndCaptures } from "./getMovesAndCaptures.js";

const getBeatenPawn = (board, current, move, isWhiteTurn) => {
  const beatenValue = isWhiteTurn ? ['BQ','B'] : ['WQ', 'W'];

  const stepX = current.x > move.x ? 1 : -1;
  const stepY = current.y > move.y ? 1 : -1;

  let beatenX = move.x, beatenY = move.y;
  do {
    beatenX += stepX;
    beatenY += stepY;
  } while (!beatenValue.includes(getValueOnBoard(board, { x: beatenX, y: beatenY })));

  console.log('beatenValue', beatenValue);
  console.log('x', beatenX);
  console.log('y', beatenY);

  return {x: beatenX, y: beatenY};
}

const removePawn = (board, pawn) => {
  document.getElementById(`board-button-${pawn.x}-${pawn.y}`).innerHTML = null;
  board[pawn.y][pawn.x] = '*';
}

const movePawn = (parent, board, from, to, isWhiteTurn, isQueen) => {
  console.log('isQueen movePawn', isQueen);
  parent.appendChild(createPawn(isWhiteTurn, isQueen));
  board[to.y][to.x] = isWhiteTurn ? (isQueen ? 'WQ' : 'W') : (isQueen ? 'BQ' : 'B');

  removePawn(board, from); 
}

const checkQueenTurningRow = (board, pawnPosition, isWhite) => {
  if (isWhite) {
    return pawnPosition.y === 0;
  } else {
    return pawnPosition.y === board.length - 1;
  }
}

const handleTurningIntoQueen = (board, pawnPosition, isWhite) => {
  if (checkQueenTurningRow(board, pawnPosition, isWhite)) {
    document.getElementById(`board-button-${pawnPosition.x}-${pawnPosition.y}`)
      .firstChild.classList.add('queen');
    board[pawnPosition.y][pawnPosition.x] = isWhite ? 'WQ' : 'BQ';
  }
}

const findOpponentPawns = (board, isWhiteTurn) => {
  const opponentValues = isWhiteTurn ? ['B', 'BQ'] : ['W', 'WQ'];
  let opponentPawnsCount = 0;
  for (const row of board) {
    for (const value of row) {
      if (opponentValues.includes(value)) opponentPawnsCount++;
    }
  }
  return opponentPawnsCount;
}

const executeMove = (
  boardElem, board, clickedBox, currentPawn, moveOptions, captureOptions, isWhiteTurn
) => {
  const clicked = getBoardButtonCoordinates(clickedBox.id);

  const isQueen = /Q$/.test(getValueOnBoard(board, currentPawn));

  for (let move of moveOptions) {
    if (move.x == clicked.x && move.y == clicked.y) {
      movePawn(clickedBox, board, currentPawn, clicked, isWhiteTurn, isQueen); 
      hideOptions(moveOptions, 'pink');
      hideOptions(captureOptions, 'red');

      // handle turning into queen
      handleTurningIntoQueen(board, clicked, isWhiteTurn)

      boardElem.setAttribute('move-state', 'before-move');
      boardElem.setAttribute('is-moving', isWhiteTurn ? 'black' : 'white');

      break;
    }
  }
  for (let beating of captureOptions) {
    if (beating.x == clicked.x && beating.y == clicked.y) {
      movePawn(clickedBox, board, currentPawn, clicked, isWhiteTurn, isQueen);
      hideOptions(moveOptions, 'pink');

      const beaten = getBeatenPawn(board, currentPawn, beating, isWhiteTurn);
      removePawn(board, beaten);
      hideOptions(captureOptions, 'red');

      // handle possible next capture
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

      // handle turning into queen
      handleTurningIntoQueen(board, clicked, isWhiteTurn)

      // check end of the game
      const opponentPawnsCount = findOpponentPawns(board, isWhiteTurn);
      console.log(`${isWhiteTurn ? 'WHITE' : 'BLACK'} move - ${isWhiteTurn ? 'BLACK' : 'WHITE'} pawns: ${opponentPawnsCount}`);
      if (opponentPawnsCount === 0) {
        console.log('end of game');
        const c = document.getElementById('board');
        const f = document.getElementById('final-result');
        c.innerHTML = null;
        f.innerText = `Winner is ${isWhiteTurn ? 'WHITE' : 'BLACK'}`;
        return;
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