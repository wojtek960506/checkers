// personal access token wz_token_08_03_25
// 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


const board = document.getElementById('board');

const BOARD_HEIGHT = 8;
const BOARD_WIDTH = 8;

const isWhite = (row, column) => {
  if (row % 2 !== 0) {
    if (column % 2 !== 0) return true;
    return false; 
  } else {
    if (column % 2 !== 0) return false;
    return true;
  }
} 

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

const drawBoardCorner = () => {
  const boardCorner = document.createElement('div');
  boardCorner.className = 'board-corner';
  return boardCorner;
}

const drawBoardInfoRow = (isTop) => {
  const boardInfoRow = document.createElement('div');
  boardInfoRow.className = 'board-info-row';
  
  
  boardInfoRow.appendChild(drawBoardCorner());
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
  boardInfoRow.appendChild(drawBoardCorner());

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
      if (isWhite(i, j)) {
        boardButton.classList.add('board-white');
      } else {
        boardButton.classList.add('board-black');
      }
      boardButton.addEventListener('click', () => {
        console.log(`(${j},${i})`);
      })
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

  board.appendChild(drawBoardInfoRow(true));
  board.appendChild(boardWithInfoColumns);
  board.appendChild(drawBoardInfoRow(false));
}




// const drawBoardNotOptimal = () => {
//   for (let i = 0; i < BOARD_HEIGHT + 2; i++) {
//     const boardRow = document.createElement('div');
    
//     if (i == 0 || i == BOARD_HEIGHT + 1) {
//       boardRow.className = 'board-row-info';
//     } else {
//       boardRow.className = 'board-row';
//     }
    
    
//     for (let j = 0; j < BOARD_WIDTH + 2; j++) {

//       if (i == 0 || i == BOARD_WIDTH + 1) {
//         const boardBoxInfo = document.createElement('div');
        

//         if (j > 0 && j < BOARD_WIDTH + 1 ) {
//           boardBoxInfo.textContent = INFO_LETTERS[j-1];
//           boardBoxInfo.className = 'board-box-info-row';
//         } else {
//           boardBoxInfo.className = 'board-box-info-corner';
//         }
//         // if (isWhite(i, j)) {
//         //   boardBoxInfo.classList.add('white');
//         // } else {
//         //   boardBoxInfo.classList.add('black');
//         // }
//         boardRow.appendChild(boardBoxInfo);
//       } else {
//         const boardBox = document.createElement('div');

//         if (j > 0 && j < BOARD_WIDTH + 1 ) {
//           boardBox.className = 'board-box';
//           boardBox.id = `board-box-${i}-${j}`;
//           if (isWhite(i, j)) {
//             boardBox.classList.add('white');
//           } else {
//             boardBox.classList.add('black');
//           }
//         } else {
//           boardBox.textContent = BOARD_WIDTH + 1 - i;
//           boardBox.className = 'board-box-info-column';
//         }

//         boardRow.appendChild(boardBox);
//       }

      

//     }

//     board.appendChild(boardRow);
//   }

// }

// drawBoardNotOptimal();

drawBoardWithInfo();