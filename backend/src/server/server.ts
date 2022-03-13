import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import { myTest } from './test';

const HOST_NAME = 'captive.circle';

const app = express();

// Redirect to our application
// https://raspberrypi.stackexchange.com/a/100118
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.hostname != HOST_NAME) {
        return res.redirect(`http://${HOST_NAME}`);
    }
    next();
});

/////////////////////////////// Endpoints //////////////////////////////////////

app.get('/', (req, res, next) => {
    res.send('Captive Circle Test Application');
})

app.get('/api/test', myTest);


///////////////////////////// Server listening /////////////////////////////////

// Problem described here: https://stackoverflow.com/q/29718394
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/test.txt'));
});

// Serve public folder
app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Node version: ${process.version}`);
    console.log(`⚡ Raspberry Pi Circle Server listening on port ${PORT}`);
});
