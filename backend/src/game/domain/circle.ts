import { PassOnAction } from "./action";
import { Direction } from "./direction";
import { Player } from "./player";

export class Circle {

    /**
     * Players are stored clockwise
     */
    private players: Player[]

    constructor(players: Player[]) {
        this.players = players;
    }

    getPlayers(): Player[] {
        return this.players;
    }

    getNeighbor(activePlayer: Player, action: PassOnAction): Player {
        if (action.steps < 1)
            throw Error('You must take at least one step');

        // Find current player
        const index = this.players.indexOf(activePlayer);
        if (index == -1)
            throw Error(`The specified player "${JSON.stringify(activePlayer)}" `
                + `could not be found`);

        // Get neighbor according to direction
        let nextPlayer: Player | null = null;
        const indexOffset = (action.direction == Direction.CLOCKWISE) ? +1 : -1;

        let stepsTaken = 0;
        let nextPlayerIndex = index;
        while (stepsTaken < action.steps) {
            nextPlayerIndex = this.wrapIndex(nextPlayerIndex + indexOffset);
            nextPlayer = this.players[nextPlayerIndex];
            if (!nextPlayer.isEliminated())
                stepsTaken++;
            else if (nextPlayer === activePlayer)
                throw Error('Could not find a new active player anymore '
                    + '-> Game logic is flawed');
        }

        if (!nextPlayer)
            throw Error('Fatal Error (should never happen): '
                + 'Next player is not defined');
        return nextPlayer;
    }

    private wrapIndex(index: number) {
        if (Math.abs(index) > this.players.length) {
            throw Error('Index out of bounds');
        }

        if (index > 0)
            return index % this.players.length;
        if (index < 0) {
            // e.g. [0, 1, 2], accessing element -1
            // gives element at index 3+(-1)=2
            return this.players.length + index;
        }
        return index;
    }

}
