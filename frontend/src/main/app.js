(async function () {
    const ws = await login();

    ws.onmessage = event => {
        const msg = event.data;
        if (msg == 'ELIMINATION_TIMEOUT')
            return handleTimeoutElimination();
        else if (msg == 'SHOWCASE')
            return handleShowcase();
    }

    handleGestures(ws);
})();

// Ready button
const readyButton = document.getElementById('ready-btn');
// readyButton.onclick = async () => {
//     try {
//         const res = await axios.post('/api/ready', { withCredentials: true });
//         console.log(res.data);
//     } catch (error) {
//         console.error(error);
//     }
//     enterFullscreen(document.documentElement);
// }


// Fullscreen handling
let isFullscreen = false;
const blob = document.getElementById('clickable-blob');
blob.addEventListener('click', () => {
    if (isFullscreen) {
        exitFullscreen(document.body);
        isFullscreen = false;
    } else {
        enterFullscreen(document.body);
        isFullscreen = true;
    }
});


function handleTimeoutElimination() {
    console.log('Handle elimination timeout');
    document.body.style.backgroundColor = ELIMINATION_COLOR;
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
