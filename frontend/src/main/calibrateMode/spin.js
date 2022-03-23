async function flickerForRandomSpin() {
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    // Flicker once
    flickerDiv.style.opacity = 1;
    await sleep(500);
    flickerDiv.style.opacity = 0;
}
