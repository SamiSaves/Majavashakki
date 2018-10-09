/* Defines user schema and model */
import {Document, Schema, SchemaOptions, Model, model} from "mongoose";
import { ObjectID } from "../../../node_modules/@types/bson/index";
import {Game} from "../entities/GameRoom";

export interface IGameDocument extends Majavashakki.IGame, Document {

}

export interface IGameModel extends Model<IGameDocument> {
  findOrCreate(title: string): Promise<IGameDocument>;
  save(game: Majavashakki.IGame, isNew?: boolean): Promise<IGameDocument>;
  findByTitle(title: string) : Promise<IGameDocument>;
  getAvailableGames(): Promise<IGameDocument[]>;
}

const options: SchemaOptions = {timestamps: true};
export let GameSchema: Schema = new Schema({
  title: String,
  playerIdWhite: String,
  playerIdBlack: String,
  board: Schema.Types.Mixed,
  createdAt: Date,

}, options);

GameSchema.statics.findOrCreate = async (title: string): Promise<IGameDocument> => {
  const result = await GameModel.findOne({title}).exec();

  if (!result) {
    console.log(`CREATING NEW GAME ${title}`);
    var game = new Game(title);
    var gameState = Game.MapForDb(game);
    return await GameModel.save(gameState, true);
  } else {
    console.log(`FOUND EXISTING GAME ${result.id} NAME: ${result.title}, ID: ${result._id}`);
    return result;
  }
};

GameSchema.statics.save = async (game: Majavashakki.IGame, isNew: boolean = false): Promise<IGameDocument> => {
  console.log(`SAVING GAME ${game.title}`)
  return await GameModel.findOneAndUpdate({title: game.title}, game, {new: true, upsert: isNew}).exec();
};

GameSchema.statics.findByTitle = async (title: string): Promise<IGameDocument> => {
  console.log("Find by title: " + title)
  var gameState = await GameModel.findOne({title}).exec();
  if (!gameState) throw new Error("Peliä ei löywy!");
  return gameState;
}

GameSchema.statics.getAvailableGames = async (): Promise<IGameDocument[]> => {
  return await GameModel.find({$or: [{playerIdWhite: null}, {playerIdBlack: null}]}).exec();
}

export const GameModel: IGameModel = model<IGameDocument, IGameModel>("GameModel", GameSchema);