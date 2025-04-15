import { consoleLogBoard } from "./logic/consoleLogBoard.js";
import { calculateInitialBoard } from "./logic/calculateInitialBoard.js";
import { drawBoardWithInfo } from "./ui/drawBoardWithInfo.js";

const BOARD_HEIGHT = 8;
const BOARD_WIDTH = 8;
const ROWS_WITH_PAWNS = 3;

const boardEl = document.getElementById('board');
const board = calculateInitialBoard(BOARD_HEIGHT, BOARD_WIDTH, ROWS_WITH_PAWNS);

drawBoardWithInfo(boardEl, board);
consoleLogBoard(board);
