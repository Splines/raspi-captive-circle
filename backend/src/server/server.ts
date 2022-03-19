import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import path from 'path';
import { Duplex } from 'stream';
import { isAuthenticated, isAuthenticatedMiddleware, sessionParser } from './connection/session';
import { websocketServer } from './connection/websocket';
import { checkCalibration, startCalibrate } from './endpoints/calibrate';
import { login } from './endpoints/login';
import { getReady } from './endpoints/ready';
import { showcase } from './endpoints/showcase';
import { startGame } from './endpoints/start';

const HOST_NAME = 'captive.circle';
const FRONTEND_FOLDER = path.join(__dirname, '../../..', 'frontend');

const app = express();
const server = http.createServer(app);

app.use(express.static(FRONTEND_FOLDER));
app.use(sessionParser);

require('./instanceManager');

// "Glue code" for websockets and sessions
server.on('upgrade', async (req: Request, socket: Duplex, head: Buffer) => {
    const authenticated = await isAuthenticated(req);
    if (!authenticated) {
        console.error('Destroy socket on upgrade as not authenticated');
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
    }

    // WebSocket Connection
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
    res.sendFile(path.join(FRONTEND_FOLDER, 'src/main/index.html'));
});

app.get('/admin', (req, res, next) => {
    res.sendFile(path.join(FRONTEND_FOLDER, 'src/admin/admin.html'))
});

app.post('/api/login', login);
app.post('/api/ready', isAuthenticatedMiddleware, getReady);

// TODO: authenticate these routes (e.g. simply with a password)
app.post('/api/admin/start-game', startGame);
app.post('/api/admin/start-showcase', showcase);
app.post('/api/admin/start-calibrate', startCalibrate);
app.post('/api/admin/check-calibration', checkCalibration);


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
