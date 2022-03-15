import { Request, Response } from 'express';
import { gameAdapter } from '../instanceManager';

export async function showcase(req: Request, res: Response) {
    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

    const connections = gameAdapter.getAllConnections();
    for (const connection of connections) {
        connection.sendIfPossible('SHOWCASE');
        await sleep(40);
    }

    res.send('Showcase started');
}
