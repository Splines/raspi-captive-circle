function handleTimeoutElimination() {
    console.log('You are eliminated due to timeout');

    removeGestureHandlingOnNextGesture();

    layers.showOnTopWithOpacityChangeHideBefore('background-gradient-elimination');
    layers.showOnTop('starting-soon');

    const middleText = document.getElementById('starting-soon-text');
    fadeToText(middleText, "Too bad, <br/> you didn't react quickly enough.<br/>Swipe one last time.");
}

function enterNotYourTurnEliminationMode() {
    console.log('You are eliminated as you swapped when it was not your turn');

    removeGestureHandling(); // NOT: "on next gesture" as above

    layers.showOnTopWithOpacityChangeHideBefore('background-gradient-elimination');
    layers.showOnTop('starting-soon');

    const middleText = document.getElementById('starting-soon-text');
    fadeToText(middleText, "Too bad, <br/> it wasn't your turn<br/>when you swiped.<br/>See you in the next game.");
}

function handleLastGesture() {
    const middleText = document.getElementById('starting-soon-text');
    fadeToText(middleText, "Thanks, now lean back<br/>and enjoy watching your friends.");
}

function handleEndGame() {
    console.log('⚡ Game ended');

    removeGestureHandling();

    layers.showOnTopWithOpacityChangeHideBefore('background-gradient-elimination');
    layers.showOnTop('starting-soon');

    const middleText = document.getElementById('starting-soon-text');
    fadeToText(middleText, "Game ended.<br/>Can you spot the winner?");
}
