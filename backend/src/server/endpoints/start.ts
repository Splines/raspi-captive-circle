import { Request, Response } from 'express';
import { gameAdapter } from '../instanceManager';

export async function startGame(req: Request, res: Response) {
    // TODO: Check if there are at least three players
    gameAdapter.initGame();
    res.send('Started game');
}
