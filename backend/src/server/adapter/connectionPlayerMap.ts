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

    getAllConnectionsUnsorted(): Connection[] {
        return Array.from(this.playerConnectionMap.values());

    }

    getAllConnectionsSorted(): Connection[] {
        const connectionsSorted = [];
        for (const player of this.players) {
            const connection = this.getConnectionFor(player);
            connectionsSorted.push(connection);
        }
        return connectionsSorted;
    }

    getConnectionFor(player: Player): Connection {
        const connection = this.playerConnectionMap.get(player);
        if (!connection)
            throw Error('No connection found for this player');
        return connection;
    }

    getPlayerBy(connection: Connection): Player {
        const player = this.connectionPlayerMap.get(connection);
        if (!player)
            throw Error('No player found for this connection');
        return player;
    }

}
