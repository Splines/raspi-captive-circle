import { Request } from 'express';
import WebSocket from 'ws';


// Resources

// WebSockets Tutorial:
// https://cheatcode.co/tutorials/how-to-set-up-a-websocket-server-with-node-js-and-express
// great resource for inidvidual clients:
// https://blog.revathskumar.com/2015/08/websockets-simple-client-and-server.html

// reconnecting: https://github.com/joewalnes/reconnecting-websocket
// https://stackoverflow.com/a/18993226/9655481

// sessions: https://stackoverflow.com/a/27727505/9655481
// http://sgeproject.narod.ru/node/app.js


// see a websocket exmaple here:
// https://github.com/websockets/ws/blob/master/examples/express-session-parse/index.js
// Create a WebSocket server completely detached from the HTTP server.
export const websocketServer = new WebSocket.Server({ noServer: true }); // no additional HTTP server

websocketServer.on('connection', (socket: WebSocket, req: Request) => {

    console.log(req.session);

    socket.on('message', (message: string) => {
        const parsedMessage = JSON.parse(message);
        console.log('This is a parsed message');
        console.log(parsedMessage);
    });

    socket.send('Welcome to this websocket ✨');

});
