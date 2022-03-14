import { Player } from "../../game/domain/player";
import { Connection } from "../connection/connection";
import { removeFromList } from "../util";

export class ConnectionPlayerManager {

    private connectionPlayerMap: Map<Connection, Player> = new Map();
    private playerConnectionMap: Map<Player, Connection> = new Map();
    private players: Player[] = [];

    /**
     * Registers a new player from the given connection.
     * 
     * If the connection was already used to register a Player, we remove the
     * player from its position and insert him/her again at the end.
     * 
     * @param connection the Connection to construct a new Player from
     */
    registerPlayerFromConnection(connection: Connection): void {
        let player: Player | undefined = this.connectionPlayerMap.get(connection);

        if (player) {
            // Remove from current position
            removeFromList(player, this.players);
        }
        else {
            player = new Player("no-name-player");
            this.connectionPlayerMap.set(connection, player);
            this.playerConnectionMap.set(player, connection);
        }

        // Insert existing player at the end
        this.players.push(player);
    }

    /**
     * @returns Players in the order they were registered
     */
    getAllPlayers(): Player[] {
        return Array.from(this.connectionPlayerMap.values());
    }

    getConnectionFor(player: Player) {
        return this.playerConnectionMap.get(player);
    }

    getPlayerBy(connection: Connection) {
        return this.connectionPlayerMap.get(connection);
    }

}
