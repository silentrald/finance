import { WalletModel } from "@/models/wallet.model";
import { DatabaseClient, WalletRepo } from "@/types/repo";

export default function createWalletRepo({
  databaseClient,
}: {
  databaseClient: DatabaseClient;
}): WalletRepo {
  return {
    async getWallets() {
      return await databaseClient.query<WalletModel>(
        "SELECT * FROM wallets;"
      );
    },
  };
}
