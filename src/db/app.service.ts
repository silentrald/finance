import { DatabaseService } from "@/types/repo";
import { Result } from "@/types/result";

import {
  CapacitorSQLite,
  SQLiteConnection,
} from "@capacitor-community/sqlite";

import { createDatabaseInitStatements } from "./init";
import createDatabaseVersions from "./versions";
import createDatabaseCommonService from "./common.service";

export default function createDatabaseAppService({
  databaseName,
  databaseVersion,
}: {
  databaseName: string;
  databaseVersion: number;
}): DatabaseService {
  const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

  return {
    ...createDatabaseCommonService({
      databaseName, databaseVersion,
    }),

    async init() {
      try {
        const { result: existing } = await sqliteConnection.isDatabase(databaseName);
        await sqliteConnection.addUpgradeStatement(
          databaseName,
          existing
            ? createDatabaseVersions()
            : createDatabaseInitStatements({ databaseVersion })
        );

        // Prepare the upgrade scripts
        const db = await this.open();
        if (db.hasError()) {
          return db.toError();
        }

        return Result.Ok();
      } catch (error: any) {
        return Result.Error("[app.service#init]", error);
      }
    },
  };
}
