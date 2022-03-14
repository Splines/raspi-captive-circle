(async function () {
    const ws = await login();

    ws.onmessage = event => {
        const msg = event.data;
        if (msg == 'ELIMINATION_TIMEOUT')
            return handleTimeoutElimination();
    }

    handleGestures(ws);
})();

// Ready button
const readyButton = document.getElementById('ready-btn');
readyButton.onclick = async () => {
    try {
        const res = await axios.post('/api/ready', { withCredentials: true });
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }
}

function handleTimeoutElimination() {
    console.log('Handle elimination timeout');
    document.body.style.backgroundColor = ELIMINATION_COLOR;
}
