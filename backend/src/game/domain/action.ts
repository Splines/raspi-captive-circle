import { Direction } from "./direction";

export class PassOnAction {

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

    static readonly CLOCKWISE = new PassOnAction(Direction.CLOCKWISE, 1);
    static readonly CLOCKWISE_SKIP = new PassOnAction(Direction.CLOCKWISE, 2);
    static readonly COUNTER_CLOCKWISE = new PassOnAction(Direction.COUNTER_CLOCKWISE, 1);
    static readonly COUNTER_CLOCKWISE_SKIP = new PassOnAction(Direction.COUNTER_CLOCKWISE, 2);

}
