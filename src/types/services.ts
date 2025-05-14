import { Result } from "./result";

export interface InitializerService {
  init(): Promise<Result<boolean>>;
}

