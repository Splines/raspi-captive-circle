const eliminationBackground = document.getElementById('background-gradient-elimination');

function handleTimeoutElimination() {
    console.log('You are eliminated due to timeout');

    // Gestures
    removeGestureHandlingOnNextGesture();

    // Background gradient
    eliminationBackground.style.opacity = 1;

    // Text
    const middleText = document.getElementById('starting-soon-text');
    fadeToText(middleText, "Too bad, <br/> you didn't react quickly enough.<br/>Swipe one last time");

    // Background gradient
    const backgroundGradient = document.getElementById('background-gradient');
    backgroundGradient.style.opacity = 0;
}


function handleLastGesture() {
    const middleText = document.getElementById('starting-soon-text');
    fadeToText(middleText, "Thanks, now lean back<br/>and enjoy watching your friends");

    // Hide canvas
    const backgroundCanvas = document.getElementById('background-particle-canvas');
    backgroundCanvas.style.zIndex = -1;
}
