const eliminationBackground = document.getElementById('background-gradient-elimination');

function handleTimeoutElimination() {
    console.log('You are eliminated due to timeout');

    // Gestures
    removeGestureHandling();

    // Background gradient
    eliminationBackground.style.opacity = 1;

    // Text
    const middleText = document.getElementById('starting-soon-text');
    fadeToText(middleText, "Too bad, <br/> you didn't react quickly enough");

    // Background gradient
    const backgroundGradient = document.getElementById('background-gradient');
    backgroundGradient.style.opacity = 0;

    // Canvas
    const backgroundCanvas = document.getElementById('background-particle-canvas');
    backgroundCanvas.style.zIndex = -1;
}
