// References
// https://www.stackbuilders.com/blog/strongly-typed-realtime-programming-with-typescript/

export type SocketEvent = "PASS_ON_CLOCKWISE" | "PASS_ON_CLOCKWISE_SKIP"
    | "PASS_ON_COUNTER_CLOCKWISE" | "PASS_ON_COUNTER_CLOCKWISE_SKIP";
export type SocketCallback = () => void;

interface WebSocketEvent {
    name: string;
    callback: SocketCallback;
}

const registeredWebSocketEvents: WebSocketEvent[] = [];

export function handleWebSocketEvent(msg: string) {
    for (const event of registeredWebSocketEvents) {
        if (event.name == msg)
            event.callback();
    }
}

export function onWebSocketEvent(event: SocketEvent, callback: SocketCallback) {
    registeredWebSocketEvents.push({
        name: event,
        callback: callback
    });
}

// Register WebSocket events
require('../endpoints/passOnMove');
