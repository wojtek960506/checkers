const getBoardInfoLetters = (boardWidth) => {
  const letters = [];
  for (let i = 0 ; i < boardWidth ; i++) {
    letters.push(String.fromCharCode(65 + i));
  }
  return `& ${letters.join(' ')} &`;
}

export const consoleLogBoard = (board) => {
  let result = '';
  const boardWidth = board[0].length;

  result += `${getBoardInfoLetters(boardWidth)}\n`;
  for (const [index, row] of board.entries()) {
    result += `${index + 1} `;
    result += row.join(' ')
    result += ` ${index + 1}\n`;
  }
  result += `${getBoardInfoLetters(boardWidth)}\n`;
  console.log(result);
}
