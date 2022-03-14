let ws = null;

(async function () {
    ws = await login();
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

////////////////////////////////// Actions /////////////////////////////////////

document.getElementById('clockwise-btn').onclick = async () => {
    ws.send('PASS_ON_CLOCKWISE');
};

document.getElementById('clockwise-skip-btn').onclick = async () => {
    ws.send('PASS_ON_CLOCKWISE_SKIP');
};

document.getElementById('counter-clockwise-btn').onclick = async () => {
    ws.send('PASS_ON_COUNTER_CLOCKWISE');
};

document.getElementById('counter-clockwise-skip-btn').onclick = async () => {
    ws.send('PASS_ON_COUNTER_CLOCKWISE_SKIP');
};
