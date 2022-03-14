import { Request } from 'express';
import { WebSocket } from 'ws';
import { connectionManager } from './server';

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
    const userId = req.session.userId;
    if (!userId) {
        console.error('Fatal error, session has no "userId"');
        return;
    }

    const connection = connectionManager.findConnectionById(userId);
    if (!connection) {
        console.error('Fatal error, cant find connection for user');
        return;
    }
    connection.assignWebSocket(socket);

    socket.on('message', onMessage);
    // socket.on('close', function () {
    //     console.log('WebSocket closed, will remove connection');
    //     connectionManager.removeConnection(userId);
    // });
});

function onMessage(message: string) {
    console.log(`Received message: ${message}`);
}
