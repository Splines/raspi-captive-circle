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
    private playersObserver: EliminatedPlayersObserver;

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
        this.playersObserver = playersObserver;
        this.time_threshold_ms = time_threshold_ms;
        this.timer = new Timer(() => {
            this.playersObserver.updateElimination(this.activePlayer);
            this.eliminatePlayer(this.activePlayer);
        }, this.time_threshold_ms);
    }

    eliminatePlayer(player: Player) {
        this.playersEliminatedCount++;
        player.eliminate();

        if (this.isGameOver()) {
            this.gameOver();
        }
    }

    isGameOver(): boolean {
        // Game is over if only one person is left
        return this.playersEliminatedCount >= this.circle.getPlayers().length - 1;
    }

    gameOver(): void {
        // Clear timer (to avoid elimination after timeout)
        this.timer.reset();

        // Notify winners
        const winners = this.getPlayersNotEliminated();
        if (winners.length != 1)
            return console.error(`❌ Found ${winners.length} winners (expected 1) `
                + '-> logic to determine "Game over" is flawed');
        this.playersObserver.updateWinner(winners[0]);
    }

    private getPlayersNotEliminated(): Player[] {
        const notEliminated = [];
        for (const player of this.circle.getPlayers()) {
            if (!player.isEliminated())
                notEliminated.push(player);
        }
        return notEliminated;
    }

    getActivePlayer(): Player {
        return this.activePlayer;
    }

    passOn(action: PassOnAction): Player {
        if (this.isGameOver()) {
            throw Error('Game should have ended, no more pass on moves should be possible');
        }

        // Set next active player
        this.activePlayer = this.circle.getNeighbor(this.activePlayer, action);
        this.timer.resetAndStart();

        return this.activePlayer;
    }

}
