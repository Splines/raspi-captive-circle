let ws = null;

// Login button
const login = document.getElementById('login-btn');
login.onclick = async () => {
    try {
        const res = await axios.post('/api/login', { withCredentials: true });
        console.log(res.data);

        // Setup WebSocket Connection
        ws = new WebSocket(`ws://${location.host}`);
    } catch (error) {
        console.error(error);
    }
}

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
