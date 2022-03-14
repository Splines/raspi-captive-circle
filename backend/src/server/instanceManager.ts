import { GameAdapter } from "./adapter/gameAdapter";
import { ConnectionManager } from "./connection/connection";
import { EliminatedTimeoutObserver } from "./endpoints/eliminate";

// Kind of a "dependency injection"
export const gameAdapter = new GameAdapter(new EliminatedTimeoutObserver());
export const connectionManager = new ConnectionManager();
