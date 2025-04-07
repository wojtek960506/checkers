// personal access token wz_token_08_03_25
// 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

import { consoleLogBoard } from "./logic/consoleLogBoard.js";
import { calculateInitialBoard } from "./logic/calculateInitialBoard.js";

const BOARD_HEIGHT = 8;
const BOARD_WIDTH = 8;

const boardEl = document.getElementById('board');
const board = calculateInitialBoard(BOARD_HEIGHT, BOARD_WIDTH);

const isWhite = (row, column) => (row + column) % 2 === 0;

const drawBoardInfoColumn = (isLeft) => {
  const boardInfoColumn = document.createElement('div');
  boardInfoColumn.className = 'board-info-column';
  boardInfoColumn.classList.add(
    `board-info-column-${isLeft ? 'left' : 'right'}`
  );
  for (let i = 0; i < BOARD_HEIGHT ; i++) {
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

const drawBoardInfoRow = (isTop) => {
  const boardInfoRow = document.createElement('div');
  boardInfoRow.className = 'board-info-row';
  
  boardInfoRow.appendChild(drawBoardCorner(isTop, false));
  for (let i = 0; i < BOARD_WIDTH; i++) {
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

const drawBoard = () => {
  const boardContainer = document.createElement('div');
  boardContainer.id = 'board-container';
  boardContainer.className = 'board-container';

  for (let i = 0 ; i < BOARD_HEIGHT ; i++) {
    
    const boardRow = document.createElement('div');
    boardRow.className = 'board-row';
    
    for (let j = 0 ; j < BOARD_WIDTH ; j++) {
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

const drawBoardWithInfo = () => {
  const boardWithInfoColumns = document.createElement('div');
  boardWithInfoColumns.className = 'board-with-info-columns';

  boardWithInfoColumns.append(drawBoardInfoColumn(true));
  boardWithInfoColumns.appendChild(drawBoard());
  boardWithInfoColumns.append(drawBoardInfoColumn(false));

  boardEl.appendChild(drawBoardInfoRow(true));
  boardEl.appendChild(boardWithInfoColumns);
  boardEl.appendChild(drawBoardInfoRow(false));
}

drawBoardWithInfo();

consoleLogBoard(board);