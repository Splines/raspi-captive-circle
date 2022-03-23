import { EliminatedPlayersObserver } from "../../game/application/eliminatedPlayersObserver";
import { Player } from "../../game/domain/player";
import { gameAdapter } from "../instanceManager";
import { setLastPlayerEliminated } from "./passOnMove";

export class EliminatedTimeoutObserver extends EliminatedPlayersObserver {

    public updateElimination(player: Player): void {
        console.log('💀 Eliminated a player (too slow)');

        setLastPlayerEliminated(player);

        const connection = gameAdapter.getPlayerConnection(player);
        connection.sendIfPossible('ELIMINATION_TIMEOUT');
    }

}

export function eliminateNotYourTurn(player: Player) {
    console.log('💀 Eliminated a player (not your turn)');
    gameAdapter.eliminatePlayer(player);
    gameAdapter.getPlayerConnection(player).sendIfPossible('ELIMINATE_NOT_YOUR_TURN');
}
