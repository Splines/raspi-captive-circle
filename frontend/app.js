// Login button
const login = document.getElementById('login-btn');
login.onclick = async () => {
    console.log('Clicked button');
    try {
        const res = await axios.post('/login');
        console.log(res.data);
    } catch (error) {
        console.error(`An error happened: ${error}`);
    }
}
