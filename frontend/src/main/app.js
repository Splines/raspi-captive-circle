(async function () {
    const ws = await login();

    let isGameOver = false;
    ws.onmessage = event => {
        const msg = event.data;
        console.log(`Got message: ${msg}`);
        if (msg == 'ELIMINATION_TIMEOUT') {
            if (isGameOver) return;
            return handleTimeoutElimination();
        }
        else if (msg == 'ELIMINATE_NOT_YOUR_TURN') {
            if (isGameOver) return;
            return enterNotYourTurnEliminationMode();
        }
        else if (msg == 'SHOWCASE') {
            return handleShowcase();
        }
        else if (msg == 'CALIBRATE') {
            return enterCalibrateMode();
        }
        else if (msg == 'CALIBRATION_CHECK') {
            return flicker(1000);
        }
        else if (msg == 'SPIN') {
            return flicker(500);
        }
        else if (msg == 'START_GAME') {
            isGameOver = false;
            return startGame(ws);
        }
        else if (msg == 'YOUR_TURN') {
            if (isGameOver) return;
            return showMoveHint();
        }
        else if (msg == 'YOUR_TURN_ENDED') {
            if (isGameOver) return;
            return hideMoveHint();
        }
        else if (msg == 'END_GAME') {
            isGameOver = true;
            return handleEndGame();
        }
        else if (msg == 'WINNER')
            return enterWinnerMode();
        console.log('Could not handle the message received');
    }
})();

// Fullscreen handling
document.getElementById('clickable-blob').addEventListener('click', onBlobFullscreen);
let isFullscreen = false;
function onBlobFullscreen() {
    if (isFullscreen) {
        exitFullscreen(document.body);
        isFullscreen = false;
    } else {
        enterFullscreen(document.body);
        isFullscreen = true;
    }
}

async function handleShowcase() {
    const sleep = ms => new Promise(res => setTimeout(res, ms));

    // Cycle back and forth through colors
    // let colors = ['#0FC2C0', '#0CABA8', '#008F8C', '#015958', '#023535'];
    let colors = ['#4a4e4d', '#0e9aa7', '#3da4ab', '#f6cd61', '#fe8a71']
    const reversed = [...colors].reverse();
    colors = colors.concat(reversed);

    for (let i = 0; i < 10; i++) {
        for (const color of colors) {
            document.body.style.backgroundColor = color;
            await sleep(120);
        }
    }
}
