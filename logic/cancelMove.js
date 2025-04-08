import { getBoardButtonCoordinates } from "../utils.js";

const cancelMove = (boardElem, clickedBox, currentPawn, moveOptions, captureOptions) => {
  if (boardElem.hasAttribute('is-next-capture')) {
    console.log('during additional capture it not allowed to cancel move')
    return;
  }
  const clicked = getBoardButtonCoordinates(clickedBox.id);
  const { x: currentPawnX, y: currentPawnY } = currentPawn;

  if (clicked.x == currentPawnX && clicked.y == currentPawnY) {
    boardElem.setAttribute('move-state', 'before-move');
    for (let move of moveOptions) {
      const b = document.getElementById(`board-button-${move.x}-${move.y}`);
      b.classList.remove('pink');
    }
    for (let capture of captureOptions) {
      const b = document.getElementById(`board-button-${capture.x}-${capture.y}`);
      b.classList.remove('red');
    }
  }
}

export { cancelMove };