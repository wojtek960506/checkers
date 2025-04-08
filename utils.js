const getBoardButtonCoordinates = (buttonId) => {
  const re = /^board-button-\d+-\d+$/;
  if (!re.test(buttonId)) return null;
  // return coordinates as [x(j),y(i)]
  const coordinates = buttonId.match(/\d+/g).map(e => parseInt(e));
  return {x: coordinates[0], y: coordinates[1]}
}

const getValueOnBoard = (board, coordinates) => {
  return board[coordinates.y][coordinates.x];
}

const hasClass = (targetEl, className) => Array.from(targetEl.classList).includes(className);

const isWhite = (row, column) => (row + column) % 2 === 0;

const showOrHideOptions = (options, className, isShowing) => {
  for (let option of options) {
    const b = document.getElementById(`board-button-${option.x}-${option.y}`);
    if (isShowing) {
      b.classList.add(className);
    } else {
      b.classList.remove(className)
    }
  }
}

const showOptions = (options, className) => {
  showOrHideOptions(options, className, true);
}

const hideOptions = (options, className) => {
  showOrHideOptions(options, className, false);
}

export {
  hasClass,
  isWhite,
  getBoardButtonCoordinates,
  getValueOnBoard,
  showOptions,
  hideOptions
};
