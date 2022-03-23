const eliminationBackground = document.getElementById('background-gradient-elimination');

function handleTimeoutElimination() {
    console.log('You are eliminated due to timeout');

    // Gestures
    removeGestureHandlingOnNextGesture();

    // Background gradient
    eliminationBackground.style.opacity = 1;

    // Text
    const middleText = document.getElementById('starting-soon-text');
    fadeToText(middleText, "Too bad, <br/> you didn't react quickly enough.<br/>Swipe one last time.");

    // Background gradient
    const backgroundGradient = document.getElementById('background-gradient');
    backgroundGradient.style.opacity = 0;

}

function handleNotYourTurnElimination() {
    console.log('You are eliminated as you swapped when it was not your turn');

    // Gestures
    removeGestureHandling(); // NOT: "on next gesture" as above

    // Background gradient
    eliminationBackground.style.opacity = 1;

    // Text
    const middleText = document.getElementById('starting-soon-text');
    fadeToText(middleText, "Too bad, <br/> it wasn't your turn<br/>when you swapped.<br/>See you in the next game.");

    // Background gradient
    const backgroundGradient = document.getElementById('background-gradient');
    backgroundGradient.style.opacity = 0;

    // Canvas
    hideCanvas();
}

function handleLastGesture() {
    // Text
    const middleText = document.getElementById('starting-soon-text');
    fadeToText(middleText, "Thanks, now lean back<br/>and enjoy watching your friends.");

    // Canvas
    hideCanvas();
}
