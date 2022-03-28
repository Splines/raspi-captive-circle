async function flicker(time) {
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    // Flicker once
    const flickerBackground = layers.showOnTopWithOpacityChangeHideBefore('background-gradient-flicker');
    await sleep(time);
    flickerBackground.style.opacity = 0;
}
