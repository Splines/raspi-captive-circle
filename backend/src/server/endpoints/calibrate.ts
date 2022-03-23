import { Request, Response } from 'express';
import { connectionManager, gameAdapter } from '../instanceManager';

export async function startCalibrate(req: Request, res: Response) {
    const connections = connectionManager.getAllConnectionsSet();
    connections.forEach(connection => {
        connection.sendIfPossible('CALIBRATE');
    });
    res.send('Calibration phase started');
}

export async function checkCalibration(req: Request, res: Response) {
    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

    const connections = gameAdapter.getAllConnectionsSorted();
    for (const connection of connections) {
        connection.sendIfPossible('CALIBRATION_CHECK');
        await sleep(600);
    }

    res.send('Calibration check phase started');
}
