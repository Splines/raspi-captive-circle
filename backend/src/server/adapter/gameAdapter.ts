import { EliminatedPlayersObserver } from "../../game/application/eliminatedPlayersObserver";
import { Game } from "../../game/application/game";
import { PassOnAction } from "../../game/domain/action";
import { Player } from "../../game/domain/player";
import { Connection } from "../connection/connection";
import { ConnectionPlayerManager } from "./connectionPlayerMap";

export class GameAdapter {

    private game: Game | null = null;
    private connectionPlayerManager = new ConnectionPlayerManager();
    private eliminationObserver: EliminatedPlayersObserver;

    constructor(eliminationObserver: EliminatedPlayersObserver) {
        this.eliminationObserver = eliminationObserver;
    }

    initGame() {
        const players = this.connectionPlayerManager.getAllPlayers();
        this.game = new Game(players, this.eliminationObserver);
    }

    registerPlayerFromConnection(connection: Connection) {
        this.connectionPlayerManager.registerPlayerFromConnection(connection);
    }

    doPassOnMove(action: PassOnAction) {
        if (!this.game)
            return console.error('Trying to make a move, but game is not initialized yet');

        // Inform current player that his/her move ended
        const activePlayer = this.game.getActivePlayer();
        this.getPlayerConnection(activePlayer).sendIfPossible('YOUR_TURN_ENDED');

        // Pass on
        const nextPlayer = this.game.passOn(action);

        // Inform next player
        // TODO: conditionally inform
        this.getPlayerConnection(nextPlayer).sendIfPossible('YOUR_TURN');
    }

    getPlayerConnection(player: Player): Connection {
        return this.connectionPlayerManager.getConnectionFor(player);
    }

    getPlayerBy(connection: Connection): Player {
        return this.connectionPlayerManager.getPlayerBy(connection);
    }

    getAllConnections() {
        return this.connectionPlayerManager.getAllConnections();
    }

}
