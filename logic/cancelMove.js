import { getBoardButtonCoordinates } from "../utils.js";

const cancelMove = (boardElem, clickedBox, currentPawn, possibleMoves) => {
  const [clickedBoxX, clickedBoxY] = getBoardButtonCoordinates(clickedBox.id);
  const [currentPawnX, currentPawnY] = currentPawn;

  if (clickedBoxX == currentPawnX && clickedBoxY == currentPawnY) {
    boardElem.setAttribute('move-state', 'before-move');
    for (let move of possibleMoves) {
      const b = document.getElementById(`board-button-${move[0]}-${move[1]}`);
      b.classList.remove('pink');
    }
  }
}

export { cancelMove };