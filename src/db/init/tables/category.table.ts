const CategoryTable = `
CREATE TABLE IF NOT EXISTS categories (
  id      INTEGER     PRIMARY KEY AUTOINCREMENT,
  name    VARCHAR(25) NOT NULL,
  color   CHAR(7)     NOT NULL
);
`.trim();

export default CategoryTable;
