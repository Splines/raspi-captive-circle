document.getElementById('start-btn').onclick = async () => {
    try {
        const res = await axios.post('/api/admin/start', { withCredentials: true });
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }
}
