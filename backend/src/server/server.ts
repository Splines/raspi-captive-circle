import { randomUUID } from 'crypto';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import path from 'path';
import { checkAuthorization, sessionParser } from './session';
import { myTest } from './test';
import { websocketServer } from './websocket/websocket';

const HOST_NAME = 'captive.circle';
const FRONTEND_FOLDER = path.join(__dirname, '../../..', 'frontend');

const app = express();
const server = http.createServer(app);

app.use(express.static(FRONTEND_FOLDER));
app.use(sessionParser);

// "Glue code" for websockets and sessions
server.on('upgrade', async (req: Request, socket, head) => {
    const isAuthorized = await checkAuthorization(req);
    if (!isAuthorized) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
    }

    console.log('Session is parsed! Verified.');
    websocketServer.handleUpgrade(req, socket, head, (websocket) => {
        websocketServer.emit('connection', websocket, req);
    });
});

// Redirect every request to our application
// https://raspberrypi.stackexchange.com/a/100118
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.hostname != HOST_NAME) {
        return res.redirect(`http://${HOST_NAME}`);
    }
    next();
});

/////////////////////////////// Endpoints //////////////////////////////////////

app.get('/', (req, res, next) => {
    res.sendFile(path.join(FRONTEND_FOLDER, 'index.html'));
})

app.post('/login', (req, res, next) => {
    const userId = randomUUID();
    console.log(`Updating session for user ${userId}`);
    req.session.userId = userId;
    res.send('OK');
});

app.get('/api/test', myTest);


///////////////////////////// Server listening /////////////////////////////////

// Problem described here: https://stackoverflow.com/q/29718394
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// Listen for requests
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Node version: ${process.version}`);
    console.log(`⚡ Raspberry Pi Circle Server listening on port ${PORT}`);
});
