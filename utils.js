const hasClass = (targetEl, className) => Array.from(targetEl.classList).includes(className);

const isWhite = (row, column) => (row + column) % 2 === 0;

export { hasClass, isWhite };