class Circle {

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

    getNeighbor(activePlayer: Player, direction: Direction, steps = 1): Player {
        if (steps < 1)
            throw Error('You must take at least one step');

        // Find current player
        const index = this.players.indexOf(activePlayer);
        if (index == -1)
            throw Error(`The specified player "${activePlayer}" could not be found`);
        if (activePlayer.isEliminated())
            throw Error(`The specified plyer "${activePlayer} is already eliminated from the game`);

        // Get neighbor according to direction
        let nextPlayerIndex: number;
        let nextPlayer: Player | null = null;
        const indexOffset = (direction == Direction.CLOCKWISE) ? +1 : -1;

        let stepsTaken = 0;
        while (stepsTaken < steps) {
            nextPlayerIndex = this.wrapIndex(index + indexOffset);
            nextPlayer = this.players[nextPlayerIndex];
            if (!nextPlayer.isEliminated())
                stepsTaken++;
            else if (nextPlayer === activePlayer)
                throw Error('Could not find a new active player anymore -> Game logic is flawed');
        }

        if (!nextPlayer)
            throw Error('Fatal Error (should never happen): Next player is not defined');
        return nextPlayer;
    }

    private wrapIndex(index: number) {
        return index % this.players.length;
    }

}
