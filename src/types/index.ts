
export type Platform = "web" | "ios" | "android";

export type AppLocale = "en" | "jp";

export interface CustomError {
  message: string;
  error?: Error;
}

