import { createPawn } from "../ui/createPawn.js";
import { hasClass } from "../utils.js";
import { consoleLogBoard } from "./consoleLogBoard.js";


const getBoardButtonCoordinates = (buttonId) => {
  const re = /^board-button-\d+-\d+$/;
  if (!re.test(buttonId)) return null;
  return buttonId.match(/\d+/g).map(e => parseInt(e)); // return coordinates as [x(j),y(i)]
}

const handleBeforeMove = (boardElem, clickedBox, isWhite) => {
  const [clickedBoxX, clickedBoxY] = getBoardButtonCoordinates(clickedBox.id);
  const possibleMoveY = isWhite ? clickedBoxY - 1 : clickedBoxY + 1;
  const possibleMoves = [
    [clickedBoxX-1, possibleMoveY], [clickedBoxX+1, possibleMoveY]
  ];

  boardElem.setAttribute('possible-moves', JSON.stringify(possibleMoves));

  for (let move of possibleMoves) {
    const b = document.getElementById(`board-button-${move[0]}-${move[1]}`);
    b.classList.add('pink');
  }
  
  boardElem.setAttribute('move-state', 'during-move');
  boardElem.setAttribute('current-pawn', JSON.stringify([clickedBoxX,clickedBoxY]));
}

const handleBeforeMoveBlack = (boardElem, clickedBox) => {
  handleBeforeMove(boardElem, clickedBox, false);
}

const handleBeforeMoveWhite = (boardElem, clickedBox) => {
  handleBeforeMove(boardElem, clickedBox, true);
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

const executeMove = (boardElem, board, clickedBox, currentPawn, possibleMoves, isWhiteTurn) => {
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

      break;
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
  let currentPawn = JSON.parse(boardElem.getAttribute('current-pawn'));
  
  const [clickedBoxX, clickedBoxY] = getBoardButtonCoordinates(clickedBox.id);

  const boardValue = board[clickedBoxY][clickedBoxX];

  switch (boardValue) {
    case 'W':
      if (isWhiteTurn) {
        if (moveState == 'before-move') {
          handleBeforeMoveWhite(boardElem, clickedBox);         
        }
        if (moveState == 'during-move') {
          cancelMove(boardElem, clickedBox, currentPawn, possibleMoves);
        }
      }
      break;
    case 'B':
      if (!isWhiteTurn) {
        if (moveState == 'before-move') {
          handleBeforeMoveBlack(boardElem, clickedBox);
        }
        if (moveState == 'during-move') {
          cancelMove(boardElem, clickedBox, currentPawn, possibleMoves);    
        }
      }
      break;
    case '*':
      if (moveState == 'during-move') {
        executeMove(boardElem, board, clickedBox, currentPawn, possibleMoves, isWhiteTurn);
      }
      break;
    default:
      break;
  }
  
}