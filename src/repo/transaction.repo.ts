import { TransactionModel } from "@/models/transaction.model";
import { DatabaseClient, TransactionRepo } from "@/types/repo";

export default function createTransactionRepo({
  databaseClient,
}: {
  databaseClient: DatabaseClient;
}): TransactionRepo {
  return {
    async getTransactions() {
      return await databaseClient.query<TransactionModel>(`
SELECT
  id, amount, type, description, timestamp,
  wallet_id as "walletId",
  category_id as "categoryId",
  to_wallet_id as "toWalletId"
FROM transactions;
`.trim());
    },
  };
}
