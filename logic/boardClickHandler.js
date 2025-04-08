
import { cancelMove } from "./cancelMove.js";
import { executeMove } from "./executeMove.js";
import { getBoardButtonCoordinates } from "../utils.js";
import { hasClass } from "../utils.js";
import { handleBeforeMoveBlack, handleBeforeMoveWhite } from "./handleBeforeMove.js";


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
  let moveOptions = JSON.parse(boardElem.getAttribute('move-options'));
  let captureOptions = JSON.parse(boardElem.getAttribute('capture-options'));
  let currentPawn = JSON.parse(boardElem.getAttribute('current-pawn'));
  
  const clicked = getBoardButtonCoordinates(clickedBox.id);

  const boardValue = board[clicked.y][clicked.x];

  switch (boardValue) {
    case 'W':
      if (isWhiteTurn) {
        if (moveState == 'before-move') {
          handleBeforeMoveWhite(boardElem, board, clickedBox);         
        }
        if (moveState == 'during-move') {
          cancelMove(boardElem, clickedBox, currentPawn, moveOptions, captureOptions);
        }
      }
      break;
    case 'B':
      if (!isWhiteTurn) {
        if (moveState == 'before-move') {
          handleBeforeMoveBlack(boardElem, board, clickedBox);
        }
        if (moveState == 'during-move') {
          cancelMove(boardElem, clickedBox, currentPawn, moveOptions, captureOptions);    
        }
      }
      break;
    case '*':
      if (moveState == 'during-move') {
        executeMove(boardElem, board, clickedBox, currentPawn, moveOptions, captureOptions, isWhiteTurn);
      }
      break;
    default:
      break;
  }
  
}