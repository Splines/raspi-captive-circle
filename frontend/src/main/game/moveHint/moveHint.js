function showMoveHint() {
    layers.showOnTopWithOpacityChangeHideBefore('move-hint');
}

function hideMoveHint() {
    const moveHint = document.getElementById('move-hint');
    moveHint.style.opacity = 0;
}
