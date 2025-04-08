import { getBoardButtonCoordinates } from "../utils.js";

const cancelMove = (boardElem, clickedBox, currentPawn, possibleMoves, possibleBeatings) => {
  const clicked = getBoardButtonCoordinates(clickedBox.id);
  const [currentPawnX, currentPawnY] = currentPawn;

  if (clicked.x == currentPawnX && clicked.y == currentPawnY) {
    boardElem.setAttribute('move-state', 'before-move');
    for (let move of possibleMoves) {
      const b = document.getElementById(`board-button-${move[0]}-${move[1]}`);
      b.classList.remove('pink');
    }
    for (let beating of possibleBeatings) {
      const b = document.getElementById(`board-button-${beating[0]}-${beating[1]}`);
      b.classList.remove('red');
    }
  }
}

export { cancelMove };