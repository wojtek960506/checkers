import { createPawn } from "../ui/createPawn.js";
import { hasClass } from "../utils.js";
import { consoleLogBoard } from "./consoleLogBoard.js";


const getBoardButtonCoordinates = (buttonId) => {
  const re = /^board-button-\d+-\d+$/;
  if (!re.test(buttonId)) return null;
  return buttonId.match(/\d+/g).map(e => parseInt(e)); // return coordinates as [x(j),y(i)]
}

const getValueOnBoard = (board, x, y) => {
  return board[y][x];
}

const isInsideBoard = (boardWidth, boardHeight, x, y) => {
  return x >= 0 && x < boardWidth && y >= 0 && y < boardHeight;
}


const getNextOnDiagonal = (clickedBoxX, clickedBoxY, moveX, moveY) => {
  // there should be also some validation if it is on diagonal
  
  let nextX = clickedBoxX < moveX ? moveX + 1 : moveX - 1;
  let nextY = clickedBoxY < moveY ? moveY + 1 : moveY - 1;
  return [nextX, nextY];
}

const getPossibleMoves = (board, clickedBoxX, clickedBoxY, isWhite) => {
  const boardHeight = board.length;
  const boardWidth = board[0].length;
  const possibleFwdMoveY = isWhite ? clickedBoxY - 1 : clickedBoxY + 1;
  const possibleBwdMoveY = isWhite ? clickedBoxY + 1 : clickedBoxY - 1;
  const possibleMoveX = [clickedBoxX - 1, clickedBoxX + 1]; // the same as possible around X

  // // it is possible to beat forward and backward
  // const possibleBeatY = [clickedBoxY - 2, clickedBoxY + 2];
  // const possibleBeatX = [clickedBoxX - 2, clickedBoxX + 2];

  const possibleMoves = [];
  const possibleBeatings = [];

  for (let moveX of possibleMoveX) {
    if (isInsideBoard(boardWidth, boardHeight, moveX, possibleFwdMoveY)) {
      const value = getValueOnBoard(board, moveX, possibleFwdMoveY);
      switch (value) {
        case 'B':
          if (isWhite) {
            // next on diagonal for possible beating
            const [nextX, nextY] = getNextOnDiagonal(
              clickedBoxX, clickedBoxY, moveX, possibleFwdMoveY
            );
            if (getValueOnBoard(board, nextX, nextY) == '*') {
              possibleBeatings.push([nextX, nextY]);
            }
          }
          break;
        case 'W':
          if (!isWhite) {
            // next on diagonal for possible beating
            const [nextX, nextY] = getNextOnDiagonal(
              clickedBoxX, clickedBoxY, moveX, possibleFwdMoveY
            );
            if (getValueOnBoard(board, nextX, nextY) == '*') {
              possibleBeatings.push([nextX, nextY]);
            }
          }
          break;
        case '*':
          possibleMoves.push([moveX, possibleFwdMoveY]);
      }
    }
  }
  
  return {
    possibleMoves, possibleBeatings
  }

  // const possibleMoves = [
  //   [clickedBoxX-1, possibleFwdMoveY], [clickedBoxX+1, possibleFwdMoveY]
  // ];
}

const handleBeforeMove = (boardElem, board, clickedBox, isWhite) => {
  const [clickedBoxX, clickedBoxY] = getBoardButtonCoordinates(clickedBox.id);
  
  const { possibleMoves, possibleBeatings } = getPossibleMoves(
    board, clickedBoxX, clickedBoxY, isWhite
  );

  boardElem.setAttribute('possible-moves', JSON.stringify(possibleMoves));
  boardElem.setAttribute('possible-beatings', JSON.stringify(possibleBeatings));

  for (let move of possibleMoves) {
    const b = document.getElementById(`board-button-${move[0]}-${move[1]}`);
    b.classList.add('pink');
  }

  for (let beating of possibleBeatings) {
    const b = document.getElementById(`board-button-${beating[0]}-${beating[1]}`);
    b.classList.add('red');
  }
  
  boardElem.setAttribute('move-state', 'during-move');
  boardElem.setAttribute('current-pawn', JSON.stringify([clickedBoxX,clickedBoxY]));
}

const handleBeforeMoveBlack = (boardElem, board, clickedBox) => {
  handleBeforeMove(boardElem, board, clickedBox, false);
}

const handleBeforeMoveWhite = (boardElem, board, clickedBox) => {
  handleBeforeMove(boardElem, board, clickedBox, true);
}

const cancelMove = (boardElem, clickedBox, currentPawn, possibleMoves) => {
  const [clickedBoxX, clickedBoxY] = getBoardButtonCoordinates(clickedBox.id);
  const [currentPawnX, currentPawnY] = currentPawn;

  if (clickedBoxX == currentPawnX && clickedBoxY == currentPawnY) {
    boardElem.setAttribute('move-state', 'before-move');
    for (let move of possibleMoves) {
      const b = document.getElementById(`board-button-${move[0]}-${move[1]}`);
      b.classList.remove('pink');
    }
  }
}

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

export const boardClickHandler = (event, boardElem, board) => {
  let clickedBox;
    
  // if we clicked pawn we need to get its parent
  // if we clicked board button we need to get this element
  // if we clicked any other element then leave the listener
  if (hasClass(event.target, 'pawn')) clickedBox = event.target.parentElement;
  else if (hasClass(event.target, 'board-button')) clickedBox = event.target;
  else return;

  let isWhiteTurn = boardElem.getAttribute('is-moving') === 'white';
  let moveState = boardElem.getAttribute('move-state');
  let possibleMoves = JSON.parse(boardElem.getAttribute('possible-moves'));
  let possibleBeatings = JSON.parse(boardElem.getAttribute('possible-beatings'));
  let currentPawn = JSON.parse(boardElem.getAttribute('current-pawn'));
  
  const [clickedBoxX, clickedBoxY] = getBoardButtonCoordinates(clickedBox.id);

  const boardValue = board[clickedBoxY][clickedBoxX];

  switch (boardValue) {
    case 'W':
      if (isWhiteTurn) {
        if (moveState == 'before-move') {
          handleBeforeMoveWhite(boardElem, board, clickedBox);         
        }
        if (moveState == 'during-move') {
          cancelMove(boardElem, clickedBox, currentPawn, possibleMoves);
        }
      }
      break;
    case 'B':
      if (!isWhiteTurn) {
        if (moveState == 'before-move') {
          handleBeforeMoveBlack(boardElem, board, clickedBox);
        }
        if (moveState == 'during-move') {
          cancelMove(boardElem, clickedBox, currentPawn, possibleMoves);    
        }
      }
      break;
    case '*':
      if (moveState == 'during-move') {
        executeMove(boardElem, board, clickedBox, currentPawn, possibleMoves, possibleBeatings, isWhiteTurn);
      }
      break;
    default:
      break;
  }
  
}