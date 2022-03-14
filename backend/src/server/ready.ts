import { Request, Response } from "express";
import { Connection } from "./connection";
import { connectionManager } from "./server";

// export class PlayerConnectionManager {

//     private playerConnectionMap: Map<Player, Connection> = new Map();

//     addPlayer(player: Player, connection: Connection) {
//         this.playerConnectionMap.set(player, connection);
//     }

//     getPlayerForConnection(connection: Connection): Player | null {
// Replace with for loop, as return won't do anything here!!!
//         this.playerConnectionMap.forEach((otherConnection, player) => {
//             if (otherConnection === connection) {
//                 return player;
//             }
//         });
//         return null;
//     }

// }

// export class GameAdapter {

//     private game: Game | null = null;

//     initGame() {
//         this.game = new Game([], new MyEliminatedPlayersObserver());
//     }

// }

// class MyEliminatedPlayersObserver extends EliminatedPlayersObserver {
//     public updateElimination(player: Player): void {
//     }
// }


const readyConnections: Connection[] = [];

export async function getReady(req: Request, res: Response) {
    const id = req.session.userId!;
    const connection = connectionManager.findConnectionById(id)!;
    if (!connection) {
        console.error('Fatal Error: No connection in getReady');
    }

    // Include in ready connections (at next position)
    if (readyConnections.indexOf(connection) != -1)
        removeFromList(connection, readyConnections);
    readyConnections.push(connection);

    res.send("Ready for the game");
}

function removeFromList(element: any, list: any[]) {
    list.forEach((el, index) => {
        if (element === el) list.splice(index, 1);
    });
}
