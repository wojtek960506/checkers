const getBoardButtonCoordinates = (buttonId) => {
  const re = /^board-button-\d+-\d+$/;
  if (!re.test(buttonId)) return null;
  // return coordinates as [x(j),y(i)]
  const coordinates = buttonId.match(/\d+/g).map(e => parseInt(e));
  return {x: coordinates[0], y: coordinates[1]}
}

const getValueOnBoard = (board, x, y) => {
  return board[y][x];
}

const hasClass = (targetEl, className) => Array.from(targetEl.classList).includes(className);

const isWhite = (row, column) => (row + column) % 2 === 0;



export { hasClass, isWhite, getBoardButtonCoordinates, getValueOnBoard };
