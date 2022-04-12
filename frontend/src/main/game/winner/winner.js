const winnerSound = new Audio('/assets/audio/winner.mp3');

function vibrateWinner() {
    navigator.vibrate([50, 100, 100, 100, 150, 100, 200, 100, 250, 100]);
}

function enterWinnerMode() {
    catchPlayPromise(winnerSound.play());
    console.log(`You are the winner 🎉`);
    vibrateWinner();

    layers.showOnTopWithOpacityChangeHideBefore('background-gradient-success');
    layers.showOnTop('starting-soon');

    const middleText = document.getElementById('starting-soon-text');
    fadeToText(middleText, "🎉 Congratulations");
}
