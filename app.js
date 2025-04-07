// personal access token wz_token_08_03_25
// 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


const board = document.getElementById('board');

const BOARD_HEIGHT = 8;
const BOARD_WIDTH = 8;
const INFO_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const isWhite = (row, column) => {
  if (row % 2 !== 0) {
    if (column % 2 !== 0) return true;
    return false; 
  } else {
    if (column % 2 !== 0) return false;
    return true;
  }
} 

const drawBoard = () => {
  


  for (let i = 0; i < BOARD_HEIGHT + 2; i++) {



    const boardRow = document.createElement('div');
    
    if (i == 0 || i == BOARD_HEIGHT + 1) {
      boardRow.className = 'board-row-info';
    } else {
      boardRow.className = 'board-row';
    }
    
    
    for (let j = 0; j < BOARD_WIDTH + 2; j++) {

      if (i == 0 || i == BOARD_WIDTH + 1) {
        const boardBoxInfo = document.createElement('div');
        

        if (j > 0 && j < BOARD_WIDTH + 1 ) {
          boardBoxInfo.textContent = INFO_LETTERS[j-1];
          boardBoxInfo.className = 'board-box-info-row';
        } else {
          boardBoxInfo.className = 'board-box-info-corner';
        }
        // if (isWhite(i, j)) {
        //   boardBoxInfo.classList.add('white');
        // } else {
        //   boardBoxInfo.classList.add('black');
        // }
        boardRow.appendChild(boardBoxInfo);
      } else {
        const boardBox = document.createElement('div');

        if (j > 0 && j < BOARD_WIDTH + 1 ) {
          boardBox.className = 'board-box';
          boardBox.id = `board-box-${i}-${j}`;
          if (isWhite(i, j)) {
            boardBox.classList.add('white');
          } else {
            boardBox.classList.add('black');
          }
        } else {
          boardBox.textContent = BOARD_WIDTH + 1 - i;
          boardBox.className = 'board-box-info-column';
        }

        boardRow.appendChild(boardBox);
      }

      

    }

    board.appendChild(boardRow);
  }

}

drawBoard();