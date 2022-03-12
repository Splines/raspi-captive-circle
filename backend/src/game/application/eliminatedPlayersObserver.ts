import { Player } from "../domain/player";

export abstract class EliminatedPlayersObserver {

    public abstract updateElimination(player: Player): void;

}
