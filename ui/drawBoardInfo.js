const drawBoardInfoCorner = (isTop, isRight) => {
  const boardCorner = document.createElement('div');
  boardCorner.className = 'board-corner';
  if (isTop) boardCorner.classList.add('top-corner');
  else boardCorner.classList.add('bottom-corner');
  if (isRight) boardCorner.classList.add('right-corner');
  else boardCorner.classList.add('left-corner');
  return boardCorner;
}

const drawBoardInfoRow = (boardWidth, isTop) => {
  const boardInfoRow = document.createElement('div');
  boardInfoRow.className = 'board-info-row';
  
  boardInfoRow.appendChild(drawBoardInfoCorner(isTop, false));
  for (let i = 0; i < boardWidth; i++) {
    const boardInfoRowBox = document.createElement('div');
    boardInfoRowBox.className = 'board-info-row-box';
    boardInfoRowBox.classList.add(
      `board-info-row-box-${isTop ? 'top' : 'bottom'}`
    );
    // 65 is char code for letter 'A'
    boardInfoRowBox.textContent = String.fromCharCode(65 + i);
    boardInfoRow.appendChild(boardInfoRowBox);
  }
  boardInfoRow.appendChild(drawBoardInfoCorner(isTop, true));

  return boardInfoRow;
}

const drawBoardInfoColumn = (boardHeight, isLeft) => {
  const boardInfoColumn = document.createElement('div');
  boardInfoColumn.className = 'board-info-column';
  boardInfoColumn.classList.add(
    `board-info-column-${isLeft ? 'left' : 'right'}`
  );
  for (let i = 0; i < boardHeight ; i++) {
    const boardInfoColumnBox = document.createElement('div');
    boardInfoColumnBox.className = 'board-info-column-box';
    boardInfoColumnBox.textContent = i + 1;
    boardInfoColumn.append(boardInfoColumnBox);
  }
  return boardInfoColumn;
}

export { drawBoardInfoRow, drawBoardInfoColumn}