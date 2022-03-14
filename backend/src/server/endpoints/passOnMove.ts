import { PassOnAction } from "../../game/domain/action";
import { Connection } from "../connection/connection";
import { onWebSocketEvent } from "../connection/websocketEvent";
import { gameAdapter } from "../instanceManager";

function isAuthorizedToMakeMove(connection: Connection) {
    const player = gameAdapter.getPlayerBy(connection);
    return !player?.isEliminated();
}

onWebSocketEvent("PASS_ON_CLOCKWISE", (connection: Connection) => {
    if (!isAuthorizedToMakeMove(connection))
        return;
    console.log('🔥 Clockwise');
    gameAdapter.doPassOnMove(PassOnAction.CLOCKWISE);
});

onWebSocketEvent("PASS_ON_CLOCKWISE_SKIP", (connection: Connection) => {
    if (!isAuthorizedToMakeMove(connection))
        return;
    console.log('🔥 Clockwise skip');
    gameAdapter.doPassOnMove(PassOnAction.CLOCKWISE_SKIP);
});

onWebSocketEvent("PASS_ON_COUNTER_CLOCKWISE", (connection: Connection) => {
    if (!isAuthorizedToMakeMove(connection))
        return;
    console.log('🔥 Counter clockwise');
    gameAdapter.doPassOnMove(PassOnAction.COUNTER_CLOCKWISE);
});

onWebSocketEvent("PASS_ON_COUNTER_CLOCKWISE_SKIP", (connection: Connection) => {
    if (!isAuthorizedToMakeMove(connection))
        return;
    console.log('🔥 Counter clockwise skip');
    gameAdapter.doPassOnMove(PassOnAction.COUNTER_CLOCKWISE_SKIP);
});
