import { Player } from "../domain/player";

export abstract class EliminatedPlayersObserver {

    public abstract updateElimination(player: Player): void;
    public abstract updateWinner(player: Player): void;

}
