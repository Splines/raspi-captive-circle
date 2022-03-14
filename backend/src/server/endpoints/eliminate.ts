import { EliminatedPlayersObserver } from "../../game/application/eliminatedPlayersObserver";
import { Player } from "../../game/domain/player";
import { gameAdapter } from "../instanceManager";

export class EliminatedTimeoutObserver extends EliminatedPlayersObserver {

    public updateElimination(player: Player): void {
        console.log('Eliminated a player');
        const connection = gameAdapter.getPlayerConnection(player);
        connection?.sendIfPossible('ELIMINATION_TIMEOUT');
    }

}
