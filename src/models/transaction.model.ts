export enum TransactionType {
  EXPENSE = "e",
  INCOME = "i",
  TRANSFER = "t",
}

export interface TransactionModel {
  id: number;
  // 10000 => 100.00
  amount: number;
  type: TransactionType;

  walletId: number;
  categoryId: number;
  toWalletId?: number | null;

  description: string;
  timestamp: string;
}

const Transaction = {
  getFormattedAmount(transaction: TransactionModel) {
    return transaction.amount / 100;
  },
};

export default Transaction;
