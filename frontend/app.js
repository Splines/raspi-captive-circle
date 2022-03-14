let ws = login();

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
