DROP SEQUENCE IF EXISTS products_sequence;
CREATE SEQUENCE products_sequence START 1;


DROP SEQUENCE IF EXISTS transactions_sequence;
CREATE SEQUENCE transactions_sequence START 1;

DROP TABLE IF EXISTS products;
CREATE TABLE products(id INTEGER PRIMARY KEY NOT NULL DEFAULT nextval('products_sequence'), name VARCHAR(255), price INTEGER);

ALTER SEQUENCE products_sequence
OWNED BY products.id;


ALTER TABLE IF EXISTS transactions DROP CONSTRAINT fk_product;
DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions(id INTEGER PRIMARY KEY NOT NULL DEFAULT nextval('transactions_sequence'), productId INTEGER, transdate DATE, amount INTEGER, CONSTRAINT fk_product
      FOREIGN KEY(productId) 
	  REFERENCES products(id));
	  
	
ALTER SEQUENCE transactions_sequence
OWNED BY transactions.id;
