import { EliminatedPlayersObserver } from "../../game/application/eliminatedPlayersObserver";
import { Game } from "../../game/application/game";
import { PassOnAction } from "../../game/domain/action";
import { Player } from "../../game/domain/player";
import { Connection } from "../connection/connection";
import { ConnectionPlayerManager } from "./connectionPlayerMap";

export class GameAdapter {

    private game: Game | null = null;
    private connectionPlayerManager = new ConnectionPlayerManager();

    initGame() {
        const players = this.connectionPlayerManager.getAllPlayers();
        this.game = new Game(players, new MyEliminatedPlayersObserver());
    }

    registerPlayerFromConnection(connection: Connection) {
        this.connectionPlayerManager.registerPlayerFromConnection(connection);
    }

    doPassOnMove(action: PassOnAction) {
        if (!this.game)
            throw Error('Trying to make a move, but game is not initialized yet');
        this.game.passOn(action);
    }

}

export const gameAdapter = new GameAdapter();


class MyEliminatedPlayersObserver extends EliminatedPlayersObserver {
    public updateElimination(player: Player): void {
        console.log('eliminated a player');
    }
}
