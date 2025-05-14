import { CategoryModel } from "@/models/category.model";
import { TransactionModel } from "@/models/transaction.model";
import { WalletModel } from "@/models/wallet.model";
import { Result } from "./result";

export interface DatabaseClient {
  query<T>(statement: string, values?: any[]): Promise<Result<T[]>>;
  run(statement: string, values?: any[]): Promise<Result<void>>;
  beginTransaction(): Promise<Result<void>>;
  commitTransaction(): Promise<Result<void>>;
  rollbackTransaction(): Promise<Result<void>>;
}

export interface DatabaseService {
  // Setup / Destructors
  init(): Promise<Result<void>>;
  open(): Promise<Result<DatabaseClient>>;
  close(): Promise<Result<void>>;

  // Getters
  getDatabaseName(): string;
}


export interface Pagination {
  page: number;
  limit: number;
}

// === REPOSITORIES === //

export interface WalletRepo {
  getWallets(): Promise<Result<WalletModel[]>>;
}

export interface CategoryRepo {
  getCategories(): Promise<Result<CategoryModel[]>>;
}

export interface TransactionRepo {
  getTransactions(): Promise<Result<TransactionModel[]>>;
}

