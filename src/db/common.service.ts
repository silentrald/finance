import { DatabaseClient } from "@/types/repo";
import { Result } from "@/types/result";

import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";

import DatabaseClientImpl from "./client";

const READONLY = false;

export default function createDatabaseCommonService({
  databaseName,
  databaseVersion,
}: {
  databaseName: string;
  databaseVersion: number;
}) {
  const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

  async function shouldRetrieveConnection() {
    const consistent = (await sqliteConnection.checkConnectionsConsistency())
      .result;
    const connection = (
      await sqliteConnection.isConnection(databaseName, READONLY)
    ).result;
    return consistent && connection;
  }

  async function getDatabase(): Promise<SQLiteDBConnection> {
    if (await shouldRetrieveConnection()) {
      return await sqliteConnection.retrieveConnection(databaseName, READONLY);
    }

    return await sqliteConnection.createConnection(
      databaseName,
      true, "encrypted",
      databaseVersion, READONLY
    );
  }

  return {
    async open(): Promise<Result<DatabaseClient>> {
      try {
        const db: SQLiteDBConnection = await getDatabase();

        await db.open();
        const { result: open } = await db.isDBOpen();

        return open
          ? Result.Ok(new DatabaseClientImpl(db))
          : Result.Error("[db/common.service#open]", new Error("Could not open sqlite database"));
      } catch (error: any) {
        return Result.Error("[db/common.service#open]", error);
      }
    },

    async close(): Promise<Result<void>> {
      try {
        const connection = (
          await sqliteConnection.isConnection(databaseName, READONLY)
        ).result;
        if (connection) {
          await sqliteConnection.closeConnection(databaseName, READONLY);
        }
        return Result.Ok();
      } catch (error: any) {
        return Result.Error("[db/common.service#close]", error);
      }
    },

    getDatabaseName(): string {
      return databaseName;
    },
  };
}
