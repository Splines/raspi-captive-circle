import { PassOnAction } from "../domain/action";
import { Circle } from "../domain/circle";
import { Player } from "../domain/player";
import { EliminatedPlayersObserver } from "./eliminatedPlayersObserver";
import { Timer } from "./timer";

export class Game {

    private circle: Circle;
    private activePlayer: Player;
    private timer: Timer;

    private readonly TIME_THRESHOLD_IN_MS = 1000;

    constructor(players: Player[], playersObserver: EliminatedPlayersObserver) {
        if (players.length < 3) {
            throw Error('There must be at least three players in a circle');
        }
        this.circle = new Circle(players);

        // First player is first registered player
        this.activePlayer = players[0];

        // Initialize Timer for elimination of players
        this.timer = new Timer(() => {
            playersObserver.updateElimination(this.activePlayer)
        }, this.TIME_THRESHOLD_IN_MS);
    }

    getActivePlayer(): Player {
        return this.activePlayer;
    }

    passOn(action: PassOnAction): Player {
        this.activePlayer = this.circle.getNeighbor(this.activePlayer, action);
        this.timer.resetAndStart();
        return this.activePlayer;
    }

}
