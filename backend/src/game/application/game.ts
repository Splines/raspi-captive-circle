import { PassOnAction } from "../domain/action";
import { Circle } from "../domain/circle";
import { Player } from "../domain/player";
import { EliminatedPlayersObserver } from "./eliminatedPlayersObserver";
import { Timer } from "./timer";

export class Game {

    private circle: Circle;
    private activePlayer: Player;
    private timer: Timer;
    private playersEliminatedCount: number = 0;

    private readonly time_threshold_ms: number;

    constructor(
        players: Player[],
        initialPlayer: Player,
        playersObserver: EliminatedPlayersObserver,
        time_threshold_ms = 1500
    ) {
        if (players.length < 3) {
            throw Error('There must be at least three players in a circle');
        }
        this.circle = new Circle(players);

        // First player is first registered player
        this.activePlayer = initialPlayer;

        // Initialize Timer for elimination of players
        this.time_threshold_ms = time_threshold_ms;
        this.timer = new Timer(() => {
            this.playersEliminatedCount++;
            this.activePlayer.eliminate();
            playersObserver.updateElimination(this.activePlayer);
        }, this.time_threshold_ms);
    }

    getActivePlayer(): Player {
        return this.activePlayer;
    }

    passOn(action: PassOnAction): Player {
        // TODO: All players eliminated handling (one winner)
        if (this.playersEliminatedCount == this.circle.getPlayers().length) {
            throw Error('All players eliminated, game should have ended');
        }

        // Set next active player
        this.activePlayer = this.circle.getNeighbor(this.activePlayer, action);
        this.timer.resetAndStart();

        return this.activePlayer;
    }

}
