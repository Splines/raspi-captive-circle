import { PassOnAction } from "../../game/domain/action";
import { gameAdapter } from "../adapter/gameAdapter";
import { onWebSocketEvent } from "../connection/websocketEvent";

onWebSocketEvent("PASS_ON_CLOCKWISE", () => {
    console.log('🔥 Clockwise');
    gameAdapter.doPassOnMove(PassOnAction.CLOCKWISE);
});

onWebSocketEvent("PASS_ON_CLOCKWISE_SKIP", () => {
    console.log('🔥 Clockwise skip');
    gameAdapter.doPassOnMove(PassOnAction.CLOCKWISE_SKIP);
});

onWebSocketEvent("PASS_ON_COUNTER_CLOCKWISE", () => {
    console.log('🔥 Counter clockwise');
    gameAdapter.doPassOnMove(PassOnAction.COUNTER_CLOCKWISE);
});

onWebSocketEvent("PASS_ON_COUNTER_CLOCKWISE_SKIP", () => {
    console.log('🔥 Counter clockwise skip');
    gameAdapter.doPassOnMove(PassOnAction.COUNTER_CLOCKWISE_SKIP);
});
