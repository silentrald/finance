const TransactionWebInsert = `
INSERT INTO transactions(
  amount, type, wallet_id,
  category_id, to_wallet_id,
  description
)
VALUES
  (100, 'e', 1, 1, null, '1st Expense'),
  (200, 'i', 2, 1, null, '1st Income'),
  (300, 't', 1, 1, 3   , '1st Transfer');
`.trim();

export default TransactionWebInsert;
