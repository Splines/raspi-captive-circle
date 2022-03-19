import { Request, Response } from 'express';
import { gameAdapter } from '../instanceManager';

export async function startGame(req: Request, res: Response) {
    // Check if enough player
    const readyConnections = gameAdapter.getAllConnections();
    if (readyConnections.length < 3) {
        return res.send(`${readyConnections.length} are not enough players. Need at least 3`);
    }

    gameAdapter.initGame();
    const playerConnections = gameAdapter.getAllConnections();
    for (const connection of playerConnections) {
        connection.sendIfPossible('START_GAME');
    }
    res.send('Started game');
}
