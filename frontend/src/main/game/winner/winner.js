function enterWinnerMode() {
    console.log(`You are the winner 🎉`);

    layers.showOnTopWithOpacityChangeHideBefore('background-gradient-success');
    layers.showOnTop('starting-soon');

    const middleText = document.getElementById('starting-soon-text');
    fadeToText(middleText, "🎉 Congratulations");

    // TODO: add sound effects for winner
}
