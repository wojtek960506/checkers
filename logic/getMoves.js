import { getValueOnBoard } from "../utils.js";


const isInsideBoard = (boardWidth, boardHeight, x, y) => {
  return x >= 0 && x < boardWidth && y >= 0 && y < boardHeight;
}


const getNextOnDiagonal = (clickedBoxX, clickedBoxY, moveX, moveY) => {
  // there should be also some validation if it is on diagonal
  
  let nextX = clickedBoxX < moveX ? moveX + 1 : moveX - 1;
  let nextY = clickedBoxY < moveY ? moveY + 1 : moveY - 1;
  return [nextX, nextY];
}


const getMoves = (board, clickedBoxX, clickedBoxY, isWhite) => {
  const boardHeight = board.length;
  const boardWidth = board[0].length;
  const possibleFwdMoveY = isWhite ? clickedBoxY - 1 : clickedBoxY + 1;
  const possibleBwdMoveY = isWhite ? clickedBoxY + 1 : clickedBoxY - 1;
  const possibleMoveX = [clickedBoxX - 1, clickedBoxX + 1]; // the same as possible around X


  const possibleMoves = [];
  const possibleBeatings = [];

  for (let moveX of possibleMoveX) {
    // -------------------------------------------------------------------------------
    if (isInsideBoard(boardWidth, boardHeight, moveX, possibleFwdMoveY)) {
      const value = getValueOnBoard(board, moveX, possibleFwdMoveY);
      switch (value) {
        case 'B':
          if (isWhite) {
            // next on diagonal for possible beating
            const [nextX, nextY] = getNextOnDiagonal(
              clickedBoxX, clickedBoxY, moveX, possibleFwdMoveY
            );
            if (isInsideBoard(boardWidth, boardHeight, nextX, nextY) && 
                getValueOnBoard(board, nextX, nextY) == '*') {
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
            if (isInsideBoard(boardWidth, boardHeight, nextX, nextY) &&
                getValueOnBoard(board, nextX, nextY) == '*') {
              possibleBeatings.push([nextX, nextY]);
            }
          }
          break;
        case '*':
          possibleMoves.push([moveX, possibleFwdMoveY]);
          break;
        default:
          break;
      }
    }
    // -------------------------------------------------------------------------------


    // -------------------------------------------------------------------------------
    if (isInsideBoard(boardWidth, boardHeight, moveX, possibleBwdMoveY)) {
      const value = getValueOnBoard(board, moveX, possibleBwdMoveY);
      switch (value) {
        case 'B':
          if (isWhite) {
            // next on diagonal for possible beating
            const [nextX, nextY] = getNextOnDiagonal(
              clickedBoxX, clickedBoxY, moveX, possibleBwdMoveY
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
              clickedBoxX, clickedBoxY, moveX, possibleBwdMoveY
            );
            if (getValueOnBoard(board, nextX, nextY) == '*') {
              possibleBeatings.push([nextX, nextY]);
            }
          }
          break;
        case '*':
        default:
          break;
      }
    }
    // -------------------------------------------------------------------------------
  }

  
  
  return {
    possibleMoves, possibleBeatings
  }
}

export { getMoves };