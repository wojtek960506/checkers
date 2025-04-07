import { drawBoard } from "./drawBoard.js";
import { drawBoardInfoRow, drawBoardInfoColumn } from "./drawBoardInfo.js";


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
