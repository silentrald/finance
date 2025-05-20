import { HexColor } from "@/types";

const WHITE = hex("#1a1a1a");
const BLACK = hex("#000000");

export function hex<T extends string>(s: HexColor<T>): T {
  return s;
}

// https://stackoverflow.com/a/1855903
export function computeTextColor(
  color: string,
  options?: {
    light?: string;
    dark?: string;
  }
): string {
  let red: number;
  let green: number;
  let blue: number;
  if (color.length === 4) {
    red = parseInt(color[1] + color[1], 16);
    green = parseInt(color[2] + color[2], 16);
    blue = parseInt(color[3] + color[3], 16);
  } else {
    red = parseInt(color.substring(1, 3), 16);
    green = parseInt(color.substring(3, 5), 16);
    blue = parseInt(color.substring(5, 7), 16);
  }

  const luminance = (
    0.299 * red
    + 0.587 * green
    + 0.114 * blue
  ) / 255;

  if (luminance > 0.5) {
    return options?.dark ?? BLACK;
  }
  return options?.light ?? WHITE;
}

