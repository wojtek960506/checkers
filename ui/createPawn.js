const createPawn = (isWhite) => {
  const pawn = document.createElement('div');
  pawn.classList.add('pawn', isWhite ? 'white' : 'black');
  return pawn;
}

export { createPawn };