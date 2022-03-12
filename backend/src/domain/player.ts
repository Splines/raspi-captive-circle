class Player {

    /**
     * Name of this Player.
     */
    private name: string;

    /**
     * Whether the current player is eliminated or not from the game.
     */
    private eliminated = false;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    isEliminated(): boolean {
        return this.eliminated;
    }

}
