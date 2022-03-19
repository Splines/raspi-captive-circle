document.getElementById('start-btn').onclick = async () => {
    try {
        const res = await axios.post('/api/admin/start', { withCredentials: true });
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
