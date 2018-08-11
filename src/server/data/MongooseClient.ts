import * as mongoose from "mongoose";
import {IDisposable} from "../components/disposable";
import * as util from "util";

let connectionString = "mongodb://localhost:27017"
if (process.env.MajavashakkiMongoConnectionString) {
  connectionString = process.env.MajavashakkiMongoConnectionString
    .replace(process.env.MajavaMongoPassword, encodeURIComponent(process.env.MajavaMongoPassword))
}

export class MongooseClient {
  public static InitMongoConnection() {
    console.log("Mongoose connecting to ", connectionString)
    mongoose.connect(connectionString, {dbName: "Majavashakki"});
    mongoose.set("debug", true);

    this.initDefaultHooks();
  }

  public static getConnection(): mongoose.Connection {
    return mongoose.connection;
  }

  private static initDefaultHooks() {
    // https://medium.com/@vsvaibhav2016/best-practice-of-mongoose-connection-with-mongodb-c470608483f0
    mongoose.connection.on("connected", () => {
      console.log("Mongoose default connection is open to ", connectionString);
    });

    mongoose.connection.on("error", (err) => {
      console.log(`Mongoose default connection has occured ${err} error`);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose default connection is disconnected");
    });

    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.log("Mongoose default connection is disconnected due to application termination");
        process.exit(0);
      });
    });
  }
}
