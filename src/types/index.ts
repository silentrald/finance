
export type Platform = "web" | "ios" | "android";

export type AppLocale = "en" | "jp";

// https://stackoverflow.com/a/68767912
type HexDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "a" | "b" | "c" | "d" | "e"| "f" | "A" | "B" | "C" | "D" | "E"| "F";
export type HexColor<T extends string = string> =
  T extends `#${HexDigit}${HexDigit}${HexDigit}${infer Rest1}`
    ? (Rest1 extends ""
      ? T // three-digit hex color
      : (
        Rest1 extends `${HexDigit}${HexDigit}${HexDigit}`
          ? T  // six-digit hex color
          : never
      )
    ) 
    : never;

export interface CustomError {
  message: string;
  error?: Error;
}

