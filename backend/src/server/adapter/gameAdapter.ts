import { EliminatedPlayersObserver } from "../../game/application/eliminatedPlayersObserver";
import { Game } from "../../game/application/game";
import { Player } from "../../game/domain/player";
import { Connection } from "../connection";
import { ConnectionPlayerManager } from "./connectionPlayerMap";

export class GameState {

    private game: Game | null = null;
    private connectionPlayerManager = new ConnectionPlayerManager();

    initGame() {
        const players = this.connectionPlayerManager.getAllPlayers();
        this.game = new Game(players, new MyEliminatedPlayersObserver());
    }

    registerPlayerFromConnection(connection: Connection) {
        this.connectionPlayerManager.registerPlayerFromConnection(connection);
    }

}

export const gameAdapter = new GameState();


class MyEliminatedPlayersObserver extends EliminatedPlayersObserver {
    public updateElimination(player: Player): void {
    }
}
