(async function () {
    const ws = await login();

    ws.onmessage = event => {
        const msg = event.data;
        console.log(`Got message: ${msg}`);
        if (msg == 'ELIMINATION_TIMEOUT')
            return handleTimeoutElimination();
        else if (msg == 'ELIMINATE_NOT_YOUR_TURN')
            return handleNotYourTurnElimination();
        else if (msg == 'SHOWCASE')
            return handleShowcase();
        else if (msg == 'CALIBRATE')
            return transitionToCalibrateMode();
        else if (msg == 'CALIBRATION_CHECK')
            return checkCalibration();
        else if (msg == 'SPIN')
            return flickerForRandomSpin();
        else if (msg == 'START_GAME')
            return startGame(ws);
        else if (msg == 'YOUR_TURN')
            return showMoveHint();
        else if (msg == 'YOUR_TURN_ENDED')
            return hideMoveHint();
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
