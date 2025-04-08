import { getValueOnBoard } from "../utils.js";


const isInsideBoard = (board, coordinates) => {
  const {x, y} = coordinates;
  const boardHeight = board.length;
  const boardWidth = board[0].length;
  return x >= 0 && x < boardWidth && y >= 0 && y < boardHeight;
}


const getNextOnDiagonal = (clicked, move) => {
  // there should be also some validation if it is on diagonal
  
  let nextX = clicked.x < move.x ? move.x + 1 : move.x - 1;
  let nextY = clicked.y < move.y ? move.x + 1 : move.x - 1;
  return {x: nextX, y: nextY};
}


const addCaptureOption = (captureOptions, board, clicked, move) => {
  // next on diagonal for possible beating
  const next = getNextOnDiagonal(clicked, move);
  if (isInsideBoard(board, next) && 
      getValueOnBoard(board, next) == '*') {
    captureOptions.push(next);
  }
}

const addMove = (
  board, moveOptions, captureOptions, move, clicked, isWhite, onlyForwards
) => {
  const {x: moveX, y: moveY} = move;
  // const {x: clickedX, y: clickedY} = clicked;
  if (isInsideBoard(board, move)) {
    const value = getValueOnBoard(board, moveX, moveY);
    if ((value === 'B' && isWhite) || (value === 'W' && !isWhite)) {
      addCaptureOption(
        captureOptions, board, clicked, move
      );
    } 
    if (onlyForwards && value === '*') {
      moveOptions.push({ x: moveX, y: moveY});
    }
  }
}

const getMovesAndCaptures = (board, clicked, isWhite) => {
  // const clickedX = clicked.x;
  // const clickedY = clicked.y;

  console.log('clicked', clicked);

  const { x: clickedX, y: clickedY } = clicked;

  const fwdOptionY = isWhite ? clickedY - 1 : clickedY + 1;
  const bwdOptionY = isWhite ? clickedY + 1 : clickedY - 1;
  const movesX = [clickedX - 1, clickedX + 1];

  const moveOptions = [];
  const captureOptions = [];

  console.log('movesX', movesX);

  for (let moveX of movesX) {
    addMove(board, moveOptions, captureOptions, {x: moveX, y: fwdOptionY}, clicked, isWhite, true);
    addMove(board, moveOptions, captureOptions, {x: moveX, y: bwdOptionY}, clicked, isWhite, false);
  }

  return {
    moveOptions, captureOptions
  }
}

export { getMovesAndCaptures };