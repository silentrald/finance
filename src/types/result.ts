import { CustomError } from ".";

export class Result<T> {
  private value?: T;
  private error?: CustomError;

  static Ok<T2 = void>(value?: T2): Result<T2> {
    return new Result<T2>(value, undefined);
  }

  static Error<T2>(message: string, error?: Error): Result<T2> {
    return new Result<T2>(undefined, { message, error });
  }

  private constructor(value: T | undefined, error: any) {
    this.value = value;
    this.error = error;
  }

  hasValue() {
    return !this.error;
  }

  hasError() {
    return Boolean(this.error);
  }

  getValue(): T {
    if (process.env.NODE_ENV === "development") {
      if (this.hasError()) {
        throw new Error("Dev Error: hasError when getValue() called");
      }
    }

    return this.value as T;
  }

  getValueOr(val: T): T {
    return this.hasError() ? val : this.value as T;
  }

  getError(): CustomError {
    if (process.env.NODE_ENV === "development") {
      if (this.hasValue()) {
        throw new Error("Dev Error: hasValue when getError() called");
      }
    }

    return this.error as CustomError;
  }

  toError<T2>(): Result<T2> {
    return (this as any) as Result<T2>;
  }

}
