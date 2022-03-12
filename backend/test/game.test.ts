import { expect } from "chai";
import { describe } from "mocha";
import { EliminatedPlayersObserver } from "../src/game/application/eliminatedPlayersObserver";
import { Game } from "../src/game/application/game";
import { PassOnAction } from "../src/game/domain/action";
import { Player } from "../src/game/domain/player";


// https://chiragrupani.medium.com/writing-unit-tests-in-typescript-d4719b8a0a40

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

});