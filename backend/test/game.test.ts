import { expect } from "chai";
import { describe } from "mocha";
import { EliminatedPlayersObserver } from "../src/game/application/eliminatedPlayersObserver";
import { Game } from "../src/game/application/game";
import { PassOnAction } from "../src/game/domain/action";
import { Player } from "../src/game/domain/player";

describe('Captive Circle Game', function () {

    it('Pass on Action', function () {
        const players = [new Player("P0"), new Player("P1"), new Player("P2")];
        class MyEliminatedPlayersObserver extends EliminatedPlayersObserver {
            public updateElimination(player: Player): void {
            }
            public updateWinner(player: Player): void {
            }
        }
        const game: Game = new Game(players, players[0], new MyEliminatedPlayersObserver());

        expect(game.getActivePlayer()).to.equal(players[0]);
        game.passOn(PassOnAction.CLOCKWISE);
        expect(game.getActivePlayer()).to.equal(players[1]);
        game.passOn(PassOnAction.CLOCKWISE);
        expect(game.getActivePlayer()).to.equal(players[2]);
        game.passOn(PassOnAction.CLOCKWISE);
        expect(game.getActivePlayer()).to.equal(players[0]);
        game.passOn(PassOnAction.CLOCKWISE_SKIP);
        expect(game.getActivePlayer()).to.equal(players[2]);
        game.passOn(PassOnAction.CLOCKWISE_SKIP);
        expect(game.getActivePlayer()).to.equal(players[1]);
        game.passOn(PassOnAction.COUNTER_CLOCKWISE_SKIP);
        expect(game.getActivePlayer()).to.equal(players[2]);
        game.passOn(PassOnAction.COUNTER_CLOCKWISE);
        expect(game.getActivePlayer()).to.equal(players[1]);
        game.passOn(PassOnAction.COUNTER_CLOCKWISE);
        expect(game.getActivePlayer()).to.equal(players[0]);
        game.passOn(PassOnAction.COUNTER_CLOCKWISE);
        expect(game.getActivePlayer()).to.equal(players[2]);
        game.passOn(PassOnAction.COUNTER_CLOCKWISE_SKIP);
        expect(game.getActivePlayer()).to.equal(players[0]);
        game.passOn(PassOnAction.CLOCKWISE_SKIP);
        expect(game.getActivePlayer()).to.equal(players[2]);
        game.passOn(PassOnAction.CLOCKWISE);
        expect(game.getActivePlayer()).to.equal(players[0]);
    });

    it('Eliminate players', async function () {
        const players = [new Player("P0"), new Player("P1"), new Player("P2")];
        const eliminated: Player[] = [];
        const winners: Player[] = [];
        class MyEliminatedPlayersObserver extends EliminatedPlayersObserver {
            public updateElimination(player: Player): void {
                eliminated.push(player);
            }
            public updateWinner(player: Player): void {
                winners.push(player);
            }
        }
        const game: Game = new Game(players, players[0], new MyEliminatedPlayersObserver(), 200);

        expect(game.getActivePlayer()).to.equal(players[0]);
        game.passOn(PassOnAction.CLOCKWISE);
        expect(game.getActivePlayer()).to.equal(players[1]);

        expect(eliminated).to.not.contain(players[1]);
        await sleep(300); // Eliminate P1
        expect(eliminated).to.contain(players[1]);
        game.passOn(PassOnAction.CLOCKWISE); // P1 chooses next action

        expect(game.getActivePlayer()).to.equal(players[2]);
        game.passOn(PassOnAction.COUNTER_CLOCKWISE); // P1 is skipped

        expect(game.getActivePlayer()).to.equal(players[0]);
        game.passOn(PassOnAction.CLOCKWISE_SKIP);

        expect(game.getActivePlayer()).to.equal(players[0]);
        game.passOn(PassOnAction.CLOCKWISE);

        expect(game.getActivePlayer()).to.equal(players[2]);
        game.passOn(PassOnAction.CLOCKWISE);

        expect(eliminated).to.deep.equal([players[1]]);
        await sleep(300); // Eliminate P0
        expect(eliminated).to.deep.equal([players[1], players[0]]);

        // Just P2 is left -> game should end, winner is P2
        expect(game.getActivePlayer()).to.equal(players[0]);
        expect(() => game.passOn(PassOnAction.COUNTER_CLOCKWISE_SKIP)).to.throw();
        expect(winners).to.deep.equal([players[2]]);
    });

});

function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
