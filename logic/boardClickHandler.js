
import { cancelMove } from "./cancelMove.js";
import { executeMove } from "./executeMove.js";
import { getBoardButtonCoordinates } from "../utils.js";
import { hasClass } from "../utils.js";
import { getMoves } from "./getMoves.js";






const handleBeforeMove = (boardElem, board, clickedBox, isWhite) => {
  const [clickedBoxX, clickedBoxY] = getBoardButtonCoordinates(clickedBox.id);
  
  const { possibleMoves, possibleBeatings } = getMoves(
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