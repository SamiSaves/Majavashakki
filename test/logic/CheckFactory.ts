import { factory } from "factory-girl"
import BoardBase from "../../src/common/BoardBase"
import { PieceColor, PieceType } from "../../src/common/GamePieces"
import { createPiece } from "./BoardHelper"

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊♜⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊♔⚊⚊⚊⚊⚊
*/
factory.define("board-check", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("b3", PieceType.Rook, PieceColor.Black, false, model),
            createPiece("c1", PieceType.King, PieceColor.White, false, model),
        ]

        return model
    },
})

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊♞⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♖⚊♜♔⚊⚊⚊⚊
*/
factory.define("board-king-in-check", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("c1", PieceType.Rook, PieceColor.Black, true, model),
            createPiece("d3", PieceType.Knight, PieceColor.Black, true, model),
            createPiece("d1", PieceType.King, PieceColor.White, true, model),
            createPiece("a1", PieceType.Rook, PieceColor.White, true, model),
        ]

        return model
    },
})

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♜⚊♖♔⚊⚊⚊⚊
*/
factory.define("board-check-from-own-move", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("d1", PieceType.King, PieceColor.White, true, model),
            createPiece("c1", PieceType.Rook, PieceColor.White, true, model),
            createPiece("a1", PieceType.Rook, PieceColor.Black, true, model),
        ]

        return model
    },
})

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♟♚⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊♙⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-check-enpassant", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("b5", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("a7", PieceType.Pawn, PieceColor.Black, false, model),
            createPiece("b7", PieceType.King, PieceColor.Black, true, model),
        ]

        return model
    },
})

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♚♜♟⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊♙⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊♚⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-check-enpassant-suicide", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("b5", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("b3", PieceType.King, PieceColor.White, true, model),
            createPiece("c7", PieceType.Pawn, PieceColor.Black, false, model),
            createPiece("a7", PieceType.King, PieceColor.Black, true, model),
            createPiece("b7", PieceType.Rook, PieceColor.Black, true, model),
        ]

        return model
    },
})

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊
    ♚⚊♟⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊♙⚊⚊⚊⚊⚊⚊
    ⚊♚⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-check-enpassant-save", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("b5", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("b4", PieceType.King, PieceColor.White, true, model),
            createPiece("c7", PieceType.Pawn, PieceColor.Black, false, model),
            createPiece("a7", PieceType.King, PieceColor.Black, true, model),
        ]

        return model
    },
})
/*  Board Description
    ⚊⚊⚊♚⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♖⚊⚊⚊♔⚊⚊⚊
*/
factory.define("board-check-castling", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a1", PieceType.Rook, PieceColor.White, false, model),
            createPiece("e1", PieceType.King, PieceColor.White, false, model),
            createPiece("d8", PieceType.King, PieceColor.Black, true, model),
        ]

        return model
    },
})

/*  Board Description
    ⚊⚊⚊♚⚊⚊⚊⚊
    ♙⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♔⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-check-promotion", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a7", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("a1", PieceType.King, PieceColor.White, true, model),
            createPiece("d8", PieceType.King, PieceColor.Black, true, model),
            createPiece("h2", PieceType.Pawn, PieceColor.Black, false, model),
        ]

        return model
    },
})

/*  Board Description
    ♚♝⚊⚊⚊⚊⚊♖
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊♔⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-check-two-kings", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a8", PieceType.King, PieceColor.Black, true, model),
            createPiece("b8", PieceType.Bishop, PieceColor.Black, true, model),
            createPiece("b6", PieceType.King, PieceColor.White, true, model),
            createPiece("h8", PieceType.Rook, PieceColor.White, true, model),
        ]

        return model
    },
})

export default factory
