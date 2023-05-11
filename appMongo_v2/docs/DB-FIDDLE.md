**Schema (MySQL v5.7)**

    CREATE TABLE products (
    	id SERIAL PRIMARY KEY,
      	nombre VARCHAR(100) NOT NULL,
      	descripcion TEXT,
      	precio DECIMAL(10, 2) NOT NULL
    );
    
    INSERT INTO products (nombre, descripcion, precio)
    VALUES ('Producto 1', 'Descripción del producto 1', 10.99),
           ('Producto 2', 'Descripción del producto 2', 19.99),
           ('Producto 3', 'Descripción del producto 3', 5.99);
    
    
---

**Query #1**

    SELECT * FROM products;

| id  | nombre     | descripcion                | precio |
| --- | ---------- | -------------------------- | ------ |
| 1   | Producto 1 | Descripción del producto 1 | 10.99  |
| 2   | Producto 2 | Descripción del producto 2 | 19.99  |
| 3   | Producto 3 | Descripción del producto 3 | 5.99   |

---
**Query #2**

    SELECT * from products 
    WHERE id = 3;

| id  | nombre     | descripcion                | precio |
| --- | ---------- | -------------------------- | ------ |
| 3   | Producto 3 | Descripción del producto 3 | 5.99   |

---
**Query #3**

    SELECT products.descripcion FROM products 
    WHERE id = 2;

| descripcion                |
| -------------------------- |
| Descripción del producto 2 |

---
**Query #4**

    UPDATE products 
    SET descripcion = 'daniel jej'
    WHERE id = 2;

There are no results to be displayed.

---
**Query #5**

    DELETE FROM products 
    WHERE nombre = 'Producto 3';

There are no results to be displayed.

---
**Query #6**

    SELECT * FROM products;

| id  | nombre     | descripcion                | precio |
| --- | ---------- | -------------------------- | ------ |
| 1   | Producto 1 | Descripción del producto 1 | 10.99  |
| 2   | Producto 2 | daniel jej                 | 19.99  |

---

[View on DB Fiddle](https://www.db-fiddle.com/)