import { capSQLiteVersionUpgrade } from "@capacitor-community/sqlite";
import CategoryTable from "./tables/category.table";
import TransactionTable from "./tables/transaction.table";
import WalletTable from "./tables/wallet.table";
import CategoryWebInsert from "./web/category.insert";
import TransactionWebInsert from "./web/transaction.insert";
import WalletWebInsert from "./web/wallet.insert";

export function createDatabaseInitStatements(params: {
  databaseVersion: number;
}): capSQLiteVersionUpgrade[] {
  return [
    {
      toVersion: params.databaseVersion,
      statements: [
        WalletTable,
        CategoryTable,

        // Before wallets and caterories
        TransactionTable,
      ],
    },
  ];
}

export function createDatabaseWebInsertStatements() {
  return [
    WalletWebInsert,
    CategoryWebInsert,

    TransactionWebInsert,
  ];
}
