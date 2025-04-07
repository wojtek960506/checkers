const isWhite = (row, column) => (row + column) % 2 === 0;

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

const drawBoardCorner = (isTop, isRight) => {
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
  
  boardInfoRow.appendChild(drawBoardCorner(isTop, false));
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
  boardInfoRow.appendChild(drawBoardCorner(isTop, true));

  return boardInfoRow;
}

const drawBoard = (board) => {
  const boardHeight = board.length;
  const boardWidth = board[0].length;
  
  const boardContainer = document.createElement('div');
  boardContainer.id = 'board-container';
  boardContainer.className = 'board-container';

  for (let i = 0 ; i < boardHeight ; i++) {
    
    const boardRow = document.createElement('div');
    boardRow.className = 'board-row';
    
    for (let j = 0 ; j < boardWidth ; j++) {
      const boardButton = document.createElement('button');
      
      boardButton.id = `board-button-${j}-${i}` // (x - row, y - column)
      boardButton.className = 'board-button';
      if (!isWhite(i, j)) {
         
        boardButton.classList.add('board-black');
        boardButton.addEventListener('click', () => {
          console.log(`(${j},${i})`);
        })
      } else {
        boardButton.classList.add('board-white');
    }

      if (board[i][j] == 'W') {
        const whitePawn = document.createElement('div');
        whitePawn.className = 'white-pawn';
        boardButton.appendChild(whitePawn);
      }
      if (board[i][j] == 'B') {
        const whitePawn = document.createElement('div');
        whitePawn.className = 'black-pawn';
        boardButton.appendChild(whitePawn);
      }

      if (!isWhite(i,j)) {
        boardButton.addEventListener('click', () => {
          console.log(`(${j},${i})`);
        })
      }
      boardRow.appendChild(boardButton);
    }
    boardContainer.appendChild(boardRow);
  }
  return boardContainer;
}

export const drawBoardWithInfo = (boardEl, board) => {
  const boardWithInfoColumns = document.createElement('div');
  boardWithInfoColumns.className = 'board-with-info-columns';

  const boardHeight = board.length;
  const boardWidth = board[0].length;

  boardWithInfoColumns.append(drawBoardInfoColumn(boardHeight, true));
  boardWithInfoColumns.appendChild(drawBoard(board));
  boardWithInfoColumns.append(drawBoardInfoColumn(boardHeight, false));

  boardEl.appendChild(drawBoardInfoRow(boardWidth, true));
  boardEl.appendChild(boardWithInfoColumns);
  boardEl.appendChild(drawBoardInfoRow(boardWidth, false));
}
