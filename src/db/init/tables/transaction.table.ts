const TransactionTable = `
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
`.trim();

export default TransactionTable;
