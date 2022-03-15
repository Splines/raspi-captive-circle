async function login() {
    try {
        const res = await axios.post('/api/login', { withCredentials: true });
        console.log(res.data);

        // Setup WebSocket Connection
        return new WebSocket(`ws://${location.host}`);
    } catch (error) {
        returnconsole.error(error);
    }
}
