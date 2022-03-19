import { Request, Response } from 'express';
import { connectionManager } from '../instanceManager';

export async function startCalibrate(req: Request, res: Response) {
    const connections = connectionManager.getAllConnectionsSet();
    connections.forEach(connection => {
        connection.sendIfPossible('CALIBRATE');
    });
    res.send('Calibration phase started');
}
