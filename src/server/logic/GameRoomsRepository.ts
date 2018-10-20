import {Game} from "../entities/GameRoom";
import {User} from "../data/User";
import {GameModel} from "../data/GameModel";
import * as Majavashakki from "../../common/GamePieces"

export class GameRoomsRepository {
    public static getInstance(): GameRoomsRepository {
        return GameRoomsRepository.instance;
    }
    private static instance: GameRoomsRepository = new GameRoomsRepository();
    public MainRoom = "Lobby";

    private constructor() {
        if (GameRoomsRepository.instance) {
            throw new Error("The GameRoomRepository is a singleton class and cannot be created!");
        }
        GameRoomsRepository.instance = this;
    }

    public async saveGame(game: Game) {
        const state: Majavashakki.IGame = Game.MapForDb(game);
        await GameModel.save(state)
    }

    public async createRoom(title: string): Promise<Majavashakki.IGameRef> {
        const doc = await GameModel.findOrCreate(title);
        return doc.denormalize();
    }

    public async joinRoom(title: string, userId: string): Promise<Game> {
        console.log("joining room : " + title)
        const doc = await GameModel.findByTitle(title);
        const game = Game.MapFromDb(doc);
        if (game.isFull()) throw new Error("Paskaa ei voi myyä, loppuunmyyty eli täysi");
        await User.addGame(userId, doc);
        game.addPlayer(userId);
        await GameModel.save(Game.MapForDb(game));
        return game;
    }

    public async getAvailableGames(): Promise<Majavashakki.IGameRef[]> {
        return await GameModel.getAvailableGames();
    }

    public async getGameRoom(title: string): Promise<Game> {
        console.log("Get game '" + title + "'");
        const doc = await GameModel.findByTitle(title);
        return Game.MapFromDb(doc);
    }
}
