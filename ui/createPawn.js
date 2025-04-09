const createPawn = (isWhite, isQueen) => {
  const pawn = document.createElement('div');
  pawn.classList.add('pawn', isWhite ? 'white' : 'black');
  if (isQueen) pawn.classList.add('queen');
  return pawn;
}

export { createPawn };