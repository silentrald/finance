import { DatabaseClient, DatabaseService } from "@/types/repo";
import { Result } from "@/types/result";

import {
  CapacitorSQLite,
  SQLiteConnection,
} from "@capacitor-community/sqlite";

import {
  createDatabaseInitStatements,
  createDatabaseWebInsertStatements,
} from "./init";
import createDatabaseVersions from "./versions";
import createDatabaseCommonService from "./common.service";

export default function createDatabaseWebService({
  databaseName,
  databaseVersion,
}: {
  databaseName: string;
  databaseVersion: number;
}): DatabaseService {
  const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

  async function populateData(db: DatabaseClient) {
    const statements = createDatabaseWebInsertStatements();

    await db.beginTransaction();
    for (const s of statements) {
      const result = await db.run(s);
      if (result.hasError()) {
        await db.rollbackTransaction();
        return result.toError();
      }
    }
    await db.commitTransaction();
    return Result.Ok();
  }

  return {
    ...createDatabaseCommonService({
      databaseName, databaseVersion,
    }),

    async init() {
      try {
        await sqliteConnection.initWebStore();
        const { result: existing } = await sqliteConnection.isDatabase(databaseName);
        await sqliteConnection.addUpgradeStatement(
          databaseName,
          existing
            ? createDatabaseVersions()
            : createDatabaseInitStatements({ databaseVersion })
        );

        // Prepare the upgrade scripts
        const dbResult = await this.open();
        if (dbResult.hasError()) {
          return dbResult.toError();
        }

        if (!existing) {
          const populateResult = await populateData(dbResult.getValue());
          if (populateResult.hasError()) {
            return populateResult.toError();
          }
        }

        await sqliteConnection.saveToStore(databaseName);

        return Result.Ok();
      } catch (error: any) {
        return Result.Error("[db/web.service#init]", error);
      }
    },
  };
}
