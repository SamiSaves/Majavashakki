import { factory } from "factory-girl";
import BoardBase from "../common/BoardBase";
import { PieceColor, PieceType } from "../../src/common/GamePieces"
import { createPiece } from "./BoardHelper"

/*  Board Description ♛♕
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊♛⚊♛⚊⚊⚊
    ⚊⚊♛⚊⚊⚊⚊⚊
*/
factory.define("board-queen-movement", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("e2", PieceType.Queen, PieceColor.White, true, model),
            createPiece("c1", PieceType.Queen, PieceColor.White, true, model),
            createPiece("c2", PieceType.Queen, PieceColor.White, true, model),
        ];

        return model;
    },
});

/*  Board Description ♛♕
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♕⚊⚊⚊⚊⚊⚊⚊
    ⚊♕⚊⚊♕⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊♛⚊⚊⚊
    ⚊⚊⚊⚊♛⚊⚊⚊
*/
factory.define("board-queen-capture", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("e2", PieceType.Queen, PieceColor.White, true, model),
            createPiece("e1", PieceType.Queen, PieceColor.White, true, model),
            createPiece("e5", PieceType.Queen, PieceColor.Black, true, model),
            createPiece("a6", PieceType.Queen, PieceColor.Black, true, model),
            createPiece("b5", PieceType.Queen, PieceColor.Black, true, model),
        ];

        return model;
    },
});

export default factory;
