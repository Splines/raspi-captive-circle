import { Request, Response } from 'express';
import { Connection } from '../connection/connection';
import { sessionParser } from '../connection/session';
import { connectionManager } from '../instanceManager';

export async function login(req: Request, res: Response) {

    sessionParser(req, {} as Response, () => {
        const sessionId = req.sessionID;
        const connection = connectionManager.findConnectionById(sessionId);

        console.log(`Session id is: ${sessionId}`);
        req.session.userId = sessionId;

        // Already logged in?
        if (connection) {
            res.send('Logged in from previous session');
        } else {
            connectionManager.addConnection(new Connection(sessionId));
            res.send('Logged in with new session');
        }
    });

}
