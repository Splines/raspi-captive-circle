import { WebSocket } from "ws";

export class ConnectionManager {

    private connections: Set<Connection> = new Set();

    addConnection(connection: Connection) {
        this.connections.add(connection);
    }

    removeConnection(uuid: string) {
        const connectionToRemove = this.findConnectionById(uuid)
        if (connectionToRemove)
            this.connections.delete(connectionToRemove);
    }

    getAllConnectionsSet(): Set<Connection> {
        return new Set(this.connections);
    }

    findConnectionById(uuid: string): Connection | null {
        for (const connection of this.connections) {
            if (connection.uuid === uuid)
                return connection;
        }
        return null;
    }

}

export class Connection {

    public readonly uuid: string;
    private _socket: WebSocket | null;

    constructor(uuid: string) {
        this.uuid = uuid;
        this._socket = null;
    }

    assignWebSocket(socket: WebSocket) {
        if (this.socket)
            this.socket.close();
        this._socket = socket;
    }

    get socket() {
        return this._socket;
    }

    sendIfPossible(msg: string) {
        if (this.socket)
            this.socket.send(msg);
        else
            console.error('Could not send msg: ', msg);
    }

}
