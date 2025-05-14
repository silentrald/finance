import { DatabaseClient } from "@/types/repo";
import { Result } from "@/types/result";

import { SQLiteDBConnection } from "@capacitor-community/sqlite";

export default class DatabaseClientImpl implements DatabaseClient {
  private database: SQLiteDBConnection;

  constructor(database: SQLiteDBConnection) {
    this.database = database;
  }

  async query<T>(statement: string, values?: any[]): Promise<Result<T[]>> {
    try {
      const result = await this.database.query(statement, values);
      return Result.Ok(result.values as T[]);
    } catch (error: any) {
      return Result.Error(`[db/client#query] statement: ${statement}`, error);
    }
  }

  async run(statement: string, values?: any[]): Promise<Result<any>> {
    try {
      const result = await this.database.run(statement, values);
      return Result.Ok(result.changes); // TODO
    } catch (error: any) {
      return Result.Error(`[db/client#run] statement ${statement}`, error);
    }
  }

  async beginTransaction(): Promise<Result<void>> {
    try {
      await this.database.beginTransaction();
      return Result.Ok();
    } catch (error: any) {
      return Result.Error("[db/client#beginTransaction]", error);
    }
  }

  async commitTransaction(): Promise<Result<void>> {
      try {
        await this.database.commitTransaction();
        return Result.Ok();
      } catch (error: any) {
        return Result.Error("[db/client#commitTransaction]", error);
      }
  }

  async rollbackTransaction(): Promise<Result<void>> {
      try {
        await this.database.rollbackTransaction();
        return Result.Ok();
      } catch (error: any) {
        return Result.Error("[db/client#rollbackTransaction]", error);
      }
  }

}
