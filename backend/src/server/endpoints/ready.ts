import { Request, Response } from "express";
import { connectionManager, gameAdapter } from "../instanceManager";

export async function getReady(req: Request, res: Response) {
    const id = req.session.userId!;
    const connection = connectionManager.findConnectionById(id)!;
    if (!connection) {
        console.error('Fatal Error: No connection in getReady');
    }

    gameAdapter.registerPlayerFromConnection(connection);

    res.send("Player is ready for the game");
}

