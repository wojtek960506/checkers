import { getValueOnBoard } from "../utils.js";


const isInsideBoard = (board, x, y) => {
  const boardHeight = board.length;
  const boardWidth = board[0].length;
  return x >= 0 && x < boardWidth && y >= 0 && y < boardHeight;
}


const getNextOnDiagonal = (clickedX, clickedY, moveX, moveY) => {
  // there should be also some validation if it is on diagonal
  
  let nextX = clickedX < moveX ? moveX + 1 : moveX - 1;
  let nextY = clickedY < moveY ? moveY + 1 : moveY - 1;
  return [nextX, nextY];
}


const addCaptureOption = (captureOptions, board, clickedX, clickedY, moveX, moveY) => {
  // next on diagonal for possible beating
  const [nextX, nextY] = getNextOnDiagonal(
    clickedX, clickedY, moveX, moveY
  );
  if (isInsideBoard(board, nextX, nextY) && 
      getValueOnBoard(board, nextX, nextY) == '*') {
    captureOptions.push([nextX, nextY]);
  }
}

const addMove = (
  board, stepOptions, possibleBeatings, moveX, moveY, clickedX, clickedY, isWhite, onlyForwards
) => {
  if (isInsideBoard(board, moveX, moveY)) {
    const value = getValueOnBoard(board, moveX, moveY);
    if ((value === 'B' && isWhite) || (value === 'W' && !isWhite)) {
      addCaptureOption(
        possibleBeatings, board, clickedX, clickedY, moveX, moveY
      );
    } 
    if (onlyForwards && value === '*') {
      stepOptions.push([moveX, moveY]);
    }
  }
}

const getMovesAndCaptures = (board, clickedX, clickedY, isWhite) => {
  const fwdOptionY = isWhite ? clickedY - 1 : clickedY + 1;
  const bwdOptionY = isWhite ? clickedY + 1 : clickedY - 1;
  const movesX = [clickedX - 1, clickedX + 1];

  const moveOptions = [];
  const captureOptions = [];

  for (let moveX of movesX) {
    addMove(board, moveOptions, captureOptions, moveX, fwdOptionY, clickedX, clickedY, isWhite, true);
    addMove(board, moveOptions, captureOptions, moveX, bwdOptionY, clickedX, clickedY, isWhite, false);
  }

  return {
    moveOptions, captureOptions
  }
}

export { getMovesAndCaptures };