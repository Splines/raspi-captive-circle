import { Request, Response } from 'express';
import { Connection } from '../connection/connection';
import { gameAdapter } from '../instanceManager';

export let gameStarted = false;

export async function startGame(req: Request, res: Response) {
    // Check if enough player
    const playerConnections = gameAdapter.getAllConnectionsSorted();
    if (playerConnections.length < 3) {
        return res.send(`${playerConnections.length} are not enough players. Need at least 3`);
    }

    const initialConnection = await spinToChooseRandomConnection(playerConnections);
    const initialPlayer = gameAdapter.getPlayerBy(initialConnection);
    gameAdapter.initGame(initialPlayer);
    gameStarted = true;

    for (const connection of playerConnections) {
        connection.sendIfPossible('START_GAME');
    }

    // Hint for initial connection
    initialConnection.sendIfPossible('YOUR_TURN');

    res.send('Started game');
}

/**
 * Plays a spin animation to choose a random player/connection.
 * @param connections sorted (!) connections
 */
async function spinToChooseRandomConnection(connections: Connection[]) {

    // Choose random initial player/connection
    const randomIndex = Math.floor(Math.random() * connections.length)
    const randomConnection = connections[randomIndex];

    // Spin animation
    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
    let connectionPassedCount = 0;
    let sleepTimeMs = 400;
    for (let i = 0; i < 3 * connections.length; i++) {
        const connection = connections[i % connections.length];

        connection.sendIfPossible('SPIN');
        await sleep(sleepTimeMs);

        if (connectionPassedCount >= 2) {
            // Get slower and slower...
            // TODO: maybe decay with exp() function?
            if (sleepTimeMs <= 600)
                sleepTimeMs += 20;
        }

        if (connection === randomConnection) {
            connectionPassedCount++;
            if (connectionPassedCount === 3)
                break;
        }

    }

    return randomConnection;
}
