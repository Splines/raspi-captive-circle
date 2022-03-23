import { EliminatedPlayersObserver } from "../../game/application/eliminatedPlayersObserver";
import { Game } from "../../game/application/game";
import { PassOnAction } from "../../game/domain/action";
import { Player } from "../../game/domain/player";
import { Connection } from "../connection/connection";
import { isMoveHintActive } from "../endpoints/moveHint";
import { ConnectionPlayerManager } from "./connectionPlayerMap";

export class GameAdapter {

    private game: Game | null = null;
    private connectionPlayerManager = new ConnectionPlayerManager();
    private eliminationObserver: EliminatedPlayersObserver;

    constructor(eliminationObserver: EliminatedPlayersObserver) {
        this.eliminationObserver = eliminationObserver;
    }

    initGame(initialPlayer: Player) {
        const players = this.connectionPlayerManager.getAllPlayers();
        this.game = new Game(players, initialPlayer, this.eliminationObserver);
    }

    registerPlayerFromConnection(connection: Connection) {
        this.connectionPlayerManager.registerPlayerFromConnection(connection);
    }

    doPassOnMove(action: PassOnAction) {
        if (!this.game)
            return console.error('Trying to make a move, but game is not initialized yet');

        const activePlayer = this.game.getActivePlayer();

        // Pass on
        const nextPlayer = this.game.passOn(action);

        if (isMoveHintActive) {
            // Inform next player
            this.getPlayerConnection(nextPlayer).sendIfPossible('YOUR_TURN');

            // Inform current player that his/her move ended
            this.getPlayerConnection(activePlayer).sendIfPossible('YOUR_TURN_ENDED');
        }
    }

    getPlayerConnection(player: Player): Connection {
        return this.connectionPlayerManager.getConnectionFor(player);
    }

    getPlayerBy(connection: Connection): Player {
        return this.connectionPlayerManager.getPlayerBy(connection);
    }

    getAllConnectionsUnsorted(): Connection[] {
        return this.connectionPlayerManager.getAllConnectionsUnsorted();
    }

    getAllConnectionsSorted(): Connection[] {
        return this.connectionPlayerManager.getAllConnectionsSorted();
    }

    broadcastMessage(message: string) {
        for (const connection of this.connectionPlayerManager.getAllConnectionsUnsorted()) {
            connection.sendIfPossible(message);
        }
    }

}
