import { PassOnAction } from "../../game/domain/action";
import { Player } from "../../game/domain/player";
import { Connection } from "../connection/connection";
import { onWebSocketEvent } from "../connection/websocketEvent";
import { gameAdapter } from "../instanceManager";
import { Nullable } from "../util";

let lastPlayerEliminated: Nullable<Player> = null;

export function setLastPlayerEliminated(player: Player) {
    lastPlayerEliminated = player;
}

function isAuthorizedToMakeMove(connection: Connection) {
    const player = gameAdapter.getPlayerBy(connection);

    // If player was eliminated, he/she has one last move to do
    if (player === lastPlayerEliminated) {
        lastPlayerEliminated = null; // Reset
        return true;
    }

    const authorized = !player.isEliminated();
    if (!authorized)
        console.log(`❌ Player already eliminated -> not authorized`);
    return authorized;
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
