
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
          cancelMove(boardElem, clickedBox, currentPawn, possibleMoves, possibleBeatings);
        }
      }
      break;
    case 'B':
      if (!isWhiteTurn) {
        if (moveState == 'before-move') {
          handleBeforeMoveBlack(boardElem, board, clickedBox);
        }
        if (moveState == 'during-move') {
          cancelMove(boardElem, clickedBox, currentPawn, possibleMoves, possibleBeatings);    
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