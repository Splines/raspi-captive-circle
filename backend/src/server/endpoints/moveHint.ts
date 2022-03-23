import { Request, Response } from "express";
import { gameAdapter } from "../instanceManager";
import { Nullable } from "../util";

export let isMoveHintActive = true;

export async function moveHint(req: Request, res: Response) {
    const setMoveHintActive: Nullable<boolean> = req.body?.setMoveHintActive;
    if (setMoveHintActive == null) {
        return res.status(400).send('Key "setMoveHintActive: true/false" missing in body');
    }

    isMoveHintActive = setMoveHintActive;

    // When deactivated: broadcast end of everyone's turn
    // in order to disable the respective UI elements
    if (!setMoveHintActive) {
        gameAdapter.broadcastMessage('YOUR_TURN_ENDED');
    }

    return res.status(200).send(`${setMoveHintActive ? 'Activated' : 'Deactived'} move hint`);
}
