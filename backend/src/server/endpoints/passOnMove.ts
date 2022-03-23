import { PassOnAction } from "../../game/domain/action";
import { Player } from "../../game/domain/player";
import { Connection } from "../connection/connection";
import { onWebSocketEvent } from "../connection/websocketEvent";
import { gameAdapter } from "../instanceManager";
import { Nullable } from "../util";
import { eliminateNotYourTurn } from "./eliminate";
import { gameStarted } from "./start";

let lastPlayerEliminated: Nullable<Player> = null;

export function setLastPlayerEliminated(player: Player) {
    lastPlayerEliminated = player;
}

function isAuthorizedToMakeMove(connection: Connection) {
    // Has game started?
    if (!gameStarted) {
        console.log('❌ Game not yet started, cannot perform a pass on move');
        return false;
    }

    const player = gameAdapter.getPlayerBy(connection);

    if (!isPlayerActivePlayer(connection))
        return;

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

function isPlayerActivePlayer(connection: Connection) {
    const player = gameAdapter.getPlayerBy(connection);
    const activePlayer = gameAdapter.getActivePlayer();

    // Check if current connection corresponds to active player
    if (activePlayer && player === activePlayer)
        return true;

    // if not: eliminate player (connection)
    eliminateNotYourTurn(player);
    return false;
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
