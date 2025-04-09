export const calculateInitialBoard = (boardHeight, boardWidth, rowsWithPawns) => {
  // board box with white pawn is marked with 'W'
  // board box with white queen is marked with 'WQ'
  // board box with black pawn is marked with 'B'
  // board box with black queen is marked with 'BQ'
  // empty bord box is marked with '*'
  
  const board = [];
  for (let i = 0; i < boardHeight; i++) {
    const boardRow = [];
    for (let j = 0; j < boardWidth; j++) {
      boardRow.push('*');
    }
    board.push(boardRow);
  }

  // draw white pawns (last 3 rows)
  for (let i = boardHeight-1 ; i > boardHeight-1-rowsWithPawns ; i--) {
    for (let j = 0 ; j < boardWidth; j++) {
      if ((i + j) % 2 != 0) board[i][j] = 'W'; 
    }
  }

  // draw black pawns (first 3 rows)
  for (let i = 0 ; i < rowsWithPawns ; i++) {
    for (let j = 0 ; j < boardWidth; j++) {
      if ((i + j) % 2 != 0) board[i][j] = 'B';
    }
  }

  return board;
}