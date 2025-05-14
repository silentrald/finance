const WalletTable = `
CREATE TABLE IF NOT EXISTS wallets (
  id        INTEGER     PRIMARY KEY AUTOINCREMENT,
  name      VARCHAR(50) NOT NULL,
  amount    INTEGER     NOT NULL,
  color     CHAR(7)     NOT NULL
);
`.trim();

export default WalletTable;
