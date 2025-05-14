export interface WalletModel {
  id: number;
  name: string;
  // No decimal places, need to be computed
  // 10000 => 100.00
  amount: number;
  color: string;
}

const Wallets = {
  getFormattedAmount(wallet: WalletModel) {
    return wallet.amount / 100;
  },
};

export default Wallets;

