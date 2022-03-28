import { Request, Response } from "express";
import { gameAdapter } from "../instanceManager";
import { startCalibrate } from "./calibrate";

export async function resetPlayerOrder(req: Request, res: Response) {
    gameAdapter.resetConnectionManager();
    return startCalibrate(req, res);
}
