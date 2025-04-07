import { drawBoard } from "./drawBoard.js";
import { drawBoardInfoRow, drawBoardInfoColumn } from "./drawBoardInfo.js";


export const drawBoardWithInfo = (boardElem, board) => {
  const boardWithInfoColumns = document.createElement('div');
  boardWithInfoColumns.className = 'board-with-info-columns';

  const boardHeight = board.length;
  const boardWidth = board[0].length;

  boardWithInfoColumns.append(drawBoardInfoColumn(boardHeight, true));
  boardWithInfoColumns.appendChild(drawBoard(boardElem, board));
  boardWithInfoColumns.append(drawBoardInfoColumn(boardHeight, false));

  boardElem.appendChild(drawBoardInfoRow(boardWidth, true));
  boardElem.appendChild(boardWithInfoColumns);
  boardElem.appendChild(drawBoardInfoRow(boardWidth, false));
}
