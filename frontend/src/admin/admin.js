document.getElementById('start-btn').onclick = async () => {
    try {
        const res = await axios.post('/api/admin/start-game', { withCredentials: true });
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }
};

document.getElementById('showcase-btn').onclick = async () => {
    try {
        const res = await axios.post('/api/admin/start-showcase', { withCredentials: true });
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }
};

document.getElementById('start-calibrating').onclick = async () => {
    try {
        const res = await axios.post('/api/admin/start-calibrate', { withCredentials: true });
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }
};

document.getElementById('check-calibration').onclick = async () => {
    try {
        const res = await axios.post('/api/admin/check-calibration', { withCredentials: true });
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }
};

// TODO: Initialize move hint checkbox via the result of a get endpoint
// e.g. when the gamemaster refreshes the admin dashboard
const moveHintCheckbox = document.getElementById('moveHint-checkbox');
moveHintCheckbox.onclick = async () => {
    try {
        const res = await axios.post('/api/admin/move-hint',
            { setMoveHintActive: moveHintCheckbox.checked },
            { withCredentials: true }
        );
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }
}