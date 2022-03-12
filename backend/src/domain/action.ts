class PassOnAction {

    private constructor(
        /**
         * The direction to pass.
         */
        public readonly direction: Direction,

        /**
         * How many players to move on or go back.
         */
        public readonly steps: number
    ) { }

    static readonly RELAY = new PassOnAction(Direction.CLOCKWISE, 1);
    static readonly RELAY_SKIP = new PassOnAction(Direction.CLOCKWISE, 2);
    static readonly RETURN = new PassOnAction(Direction.COUNTER_CLOCKWISE, 2);
    static readonly RETURN_SKIP = new PassOnAction(Direction.COUNTER_CLOCKWISE, 2);

}
