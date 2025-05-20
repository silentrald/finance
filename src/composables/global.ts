import { CategoryRepo, TransactionRepo, WalletRepo } from "@/types/repo";
import { ComponentInternalInstance, getCurrentInstance } from "vue";

export default function useGlobal(params?: {
  app?: ComponentInternalInstance | null
}) {
  const app = params ? params.app : getCurrentInstance();
  return (app as any).appContext.config.globalProperties as {
    $repos: {
      wallet: WalletRepo;
      category: CategoryRepo;
      transaction: TransactionRepo;
    };
  };
}
