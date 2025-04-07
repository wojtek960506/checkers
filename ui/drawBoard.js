import { consoleLogBoard } from "../logic/consoleLogBoard.js";


const isWhite = (row, column) => (row + column) % 2 === 0;

const getBoardButtonCoordinates = (buttonId) => {
  const re = /^board-button-\d+-\d+$/;
  if (!re.test(buttonId)) return null;
  return buttonId.match(/\d+/g).map(e => parseInt(e)); // return coordinates as [x(j),y(i)]
}

const hasClass = (targetEl, className) => Array.from(targetEl.classList).includes(className);

const createPawn = (isWhite) => {
  const pawn = document.createElement('div');
  pawn.classList.add('pawn', isWhite ? 'white' : 'black');
  return pawn;
}

// i - column, j - row
const createBoardButton = (board, i, j) => {
  const boardButton = document.createElement('button');
      
  boardButton.id = `board-button-${j}-${i}` // (x (j) - row, y - (i) column)
  boardButton.className = 'board-button';

  if (!isWhite(i, j)) boardButton.classList.add('board-black');
  else boardButton.classList.add('board-white');

  if (board[i][j] == 'W') boardButton.appendChild(createPawn(true));
  if (board[i][j] == 'B') boardButton.appendChild(createPawn(false));
  return boardButton;
}


// we have to know the current state of board (`board`)
// we have to know which color is now moving (`isWhiteTurn`)
// we have to know the current state of move (`moveState`)
//   - is pawn to be clicked
//   - has pawn been clicked
//   - has pawn be moved
const drawBoard = (boardElem, board) => {
  const boardHeight = board.length;
  const boardWidth = board[0].length;

  const boardContainer = document.createElement('div');
  boardContainer.id = 'board-container';
  boardContainer.className = 'board-container';

  for (let i = 0 ; i < boardHeight ; i++) {
    
    const boardRow = document.createElement('div');
    boardRow.className = 'board-row';
    
    for (let j = 0 ; j < boardWidth ; j++) {
      boardRow.appendChild(createBoardButton(board, i, j));
    }
    boardContainer.appendChild(boardRow);
  }

  boardContainer.addEventListener('click', (event) => {
    let elem;
    // if we clicked pawn we need to get its parent
    // if we clicked board button we need to get this element
    // if we clicked any other element then leave the listener
    if (hasClass(event.target, 'pawn')) elem = event.target.parentElement;
    else if (hasClass(event.target, 'board-button')) elem = event.target;
    else return;

    let isWhiteTurn = boardElem.getAttribute('is-moving') === 'white';
    let moveState = boardElem.getAttribute('move-state');
    console.log(isWhiteTurn);
    
    const [x, y] = getBoardButtonCoordinates(elem.id);

    const boardValue = board[y][x];
    // console.log(boardElem);
    switch (boardValue) {
      case 'W':
        if (isWhiteTurn) {
          
          if (moveState == 'before-move') {
            console.log('possible moves:')
            
            console.log(`(${x-1},${y-1})`);
            console.log(`(${x+1},${y-1})`);


            const possibleMoves = [
              [x-1, y-1], [x+1, y-1]
            ];

            boardElem.setAttribute('possible-moves', JSON.stringify(possibleMoves));


            for (let move of possibleMoves) {
              const b = document.getElementById(`board-button-${move[0]}-${move[1]}`);
              b.classList.add('pink');
            }
            

            boardElem.setAttribute('move-state', 'during-move');
            boardElem.setAttribute('current-pawn', JSON.stringify([x,y]));
          }

          // if (moveState == 'during-move') {
          //   console.log('during-move');

          //   const possibleMoves = JSON.parse(boardElem.getAttribute('possible-moves'));

          //   console.log(possibleMoves.length);
          //   console.log(possibleMoves);




          //   for (let move of possibleMoves) {
          //     const b = document.getElementById(`board-button-${move[0]}-${move[1]}`);
          //     b.classList.add('pink');
          //   }

            
          //   boardElem.setAttribute('move-state', 'before-move');
          //   boardElem.setAttribute('is-moving', 'black');
          // }

          console.log('white is moving now');

          // boardElem.setAttribute('is-moving', 'black');
        } else {
          console.log('white is not moving now');
        }
        break;
      case 'B':
        if (isWhiteTurn) {
          console.log('black is not moving now');
        } else {
          console.log('black is moving now');
          boardElem.setAttribute('is-moving', 'white');
        }
        break;
      case '*':
        if (moveState == 'during-move') {
          console.log('during-move');

          const possibleMoves = JSON.parse(boardElem.getAttribute('possible-moves'));
          const currentPawn = JSON.parse(boardElem.getAttribute('current-pawn'));

          

          for (let move of possibleMoves) {
            if (move[0] == x && move[1] == y) {
              boardElem.setAttribute('move-state', 'before-move');
              boardElem.setAttribute('is-moving', 'black');

              
              console.log(elem);
              elem.appendChild(createPawn(true));
              board[y][x] = 'W';
              console.log(elem);

              document.getElementById(`board-button-${currentPawn[0]}-${currentPawn[1]}`).innerHTML = null;
              board[currentPawn[1]][currentPawn[0]] = '*';
              


              for (let move of possibleMoves) {
                const b = document.getElementById(`board-button-${move[0]}-${move[1]}`);
                b.classList.remove('pink');
              }

              break;
            }
          }


          // for (let move of possibleMoves) {
          //   const b = document.getElementById(`board-button-${move[0]}-${move[1]}`);
          //   b.classList.remove('pink');
          // }

          
          // boardElem.setAttribute('move-state', 'before-move');
          // boardElem.setAttribute('is-moving', 'black');
        }
        break;
      default:
        console.log('no pawn in this box');
    }



  });

  return boardContainer;
}

export { drawBoard };