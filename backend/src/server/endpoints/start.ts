import { Request, Response } from 'express';
import { gameAdapter } from '../adapter/gameAdapter';

export async function startGame(req: Request, res: Response) {
    gameAdapter.initGame();
    res.send('Started game');
}
