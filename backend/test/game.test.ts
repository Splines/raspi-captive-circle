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
        }
        const game: Game = new Game(players, new MyEliminatedPlayersObserver());

        expect(game.getActivePlayer()).to.equal(players[0]);
        game.passOn(PassOnAction.RELAY);
        expect(game.getActivePlayer()).to.equal(players[1]);
        game.passOn(PassOnAction.RELAY);
        expect(game.getActivePlayer()).to.equal(players[2]);
        game.passOn(PassOnAction.RELAY);
        expect(game.getActivePlayer()).to.equal(players[0]);
        game.passOn(PassOnAction.RELAY_SKIP);
        expect(game.getActivePlayer()).to.equal(players[2]);
        game.passOn(PassOnAction.RELAY_SKIP);
        expect(game.getActivePlayer()).to.equal(players[1]);
        game.passOn(PassOnAction.RETURN_SKIP);
        expect(game.getActivePlayer()).to.equal(players[2]);
        game.passOn(PassOnAction.RETURN);
        expect(game.getActivePlayer()).to.equal(players[1]);
        game.passOn(PassOnAction.RETURN);
        expect(game.getActivePlayer()).to.equal(players[0]);
        game.passOn(PassOnAction.RETURN);
        expect(game.getActivePlayer()).to.equal(players[2]);
        game.passOn(PassOnAction.RETURN_SKIP);
        expect(game.getActivePlayer()).to.equal(players[0]);
        game.passOn(PassOnAction.RELAY_SKIP);
        expect(game.getActivePlayer()).to.equal(players[2]);
        game.passOn(PassOnAction.RELAY);
        expect(game.getActivePlayer()).to.equal(players[0]);
    });

    it('Eliminate players', async function () {
        const players = [new Player("P0"), new Player("P1"), new Player("P2")];
        const eliminated: Player[] = [];
        class MyEliminatedPlayersObserver extends EliminatedPlayersObserver {
            public updateElimination(player: Player): void {
                eliminated.push(player);
            }
        }
        const game: Game = new Game(players, new MyEliminatedPlayersObserver(), 200);

        expect(game.getActivePlayer()).to.equal(players[0]);
        game.passOn(PassOnAction.RELAY);
        expect(game.getActivePlayer()).to.equal(players[1]);

        expect(eliminated).to.not.contain(players[1]);
        await sleep(300); // Eliminate P1
        expect(eliminated).to.contain(players[1]);
        game.passOn(PassOnAction.RELAY); // P1 chooses next action

        expect(game.getActivePlayer()).to.equal(players[2]);
        game.passOn(PassOnAction.RETURN); // P1 is skipped

        expect(game.getActivePlayer()).to.equal(players[0]);
        game.passOn(PassOnAction.RELAY_SKIP);

        expect(game.getActivePlayer()).to.equal(players[0]);
        game.passOn(PassOnAction.RELAY);

        expect(game.getActivePlayer()).to.equal(players[2]);
        game.passOn(PassOnAction.RELAY);

        expect(eliminated).to.deep.equal([players[1]]);
        await sleep(300); // Eliminate P0
        expect(eliminated).to.deep.equal([players[1], players[0]]);
        game.passOn(PassOnAction.RELAY); // P0 chooses next action

        // Just P2 is left
        game.passOn(PassOnAction.RETURN_SKIP);
        expect(game.getActivePlayer()).to.equal(players[2]);

        // P2 eliminates him/herself
        game.passOn(PassOnAction.RELAY);
        await sleep(300);
        expect(eliminated).to.deep.equal([players[1], players[0], players[2]]);

        // Error if P2 wants to do something since all players are eliminated
        expect(() => game.passOn(PassOnAction.RELAY)).to.throw();
    });

});

function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
