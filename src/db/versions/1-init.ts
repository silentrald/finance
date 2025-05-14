import { capSQLiteVersionUpgrade } from "@capacitor-community/sqlite";

const V1_Init_Upgrade: capSQLiteVersionUpgrade = {
  toVersion: 1,
  statements: [
    `
CREATE TABLE IF NOT EXISTS wallets (
  id        INTEGER     PRIMARY KEY AUTOINCREMENT,
  name      VARCHAR(50) NOT NULL,
  amount    INTEGER     NOT NULL,
  color     CHAR(7)     NOT NULL
);
`.trim(),
    `
CREATE TABLE IF NOT EXISTS categories (
  id      INTEGER     PRIMARY KEY AUTOINCREMENT,
  name    VARCHAR(25) NOT NULL,
  color   CHAR(7)     NOT NULL
);
`.trim(),
    `
CREATE TABLE IF NOT EXISTS transactions (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  amount        INTEGER NOT NULL,
  type          CHAR(1) NOT NULL,
  wallet_id     INTEGER NOT NULL,
  category_id   INTEGER NOT NULL,
  to_wallet_id  INTEGER,
  description   VARCHAR(200) NOT NULL,
  timestamp     TEXT    NOT NULL DEFAULT(datetime('now')),
  FOREIGN KEY (wallet_id) REFERENCES wallets(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (to_wallet_id) REFERENCES wallets(id)
);
`.trim(),
  ],
};


export default V1_Init_Upgrade;
