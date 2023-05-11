# from zero to superhero

---------
Guía de PostgreSQL para la creación y manipulación de una base de datos de productos

En esta guía te mostraremos cómo crear una base de datos de productos en PostgreSQL y cómo realizar algunas operaciones básicas, como insertar, consultar, actualizar y eliminar datos. También te proporcionaremos algunos ejemplos adicionales de selección de datos utilizando la cláusula `WHERE`.

Para seguir esta guía, necesitarás tener PostgreSQL instalado en tu sistema. Si no lo tienes instalado, puedes descargarlo desde el sitio web oficial: https://www.postgresql.org/download/

Sin más preámbulos, ¡comencemos!

## Clase 5 - PostgreSQL

## Crear Base de datos

Crea una base de datos de productos en PostgreSQL y una tabla llamada `productos` con los siguientes campos:

```pg
CREATE DATABASE productos;
```

Para crear la tabla se ejecuta:

```pg
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  inventario INTEGER NOT NULL
);
```

## Ejemplos de operaciones

A continuación, te proporcionamos algunos ejemplos de operaciones básicas que puedes realizar en la base de datos de `productos`:

### Insertar datos

Inserta algunos registros en la tabla `productos`:

```pg
INSERT INTO productos (nombre, descripcion, precio, inventario)
VALUES ('Producto 1', 'Descripción del producto 1', 10.99, 100),
       ('Producto 2', 'Descripción del producto 2', 19.99, 50),
       ('Producto 3', 'Descripción del producto 3', 5.99, 200);
```

### Consultar datos

Consulta los registros de la tabla `productos`:

```pg
SELECT * FROM productos;
```

#### Seleccionar registros que cumplan una condición

Selecciona los productos que tengan un precio menor o igual a 10:

```pg
SELECT * FROM productos
WHERE precio <= 10;
```

#### Seleccionar registros que contengan una cadena de texto

Selecciona los productos que contengan la palabra "rojo" en su descripción:

```pg
SELECT * FROM productos
WHERE descripcion LIKE '%rojo%';
```

#### Seleccionar registros que cumplan múltiples condiciones

Selecciona los productos que tengan un precio entre 5 y 15 y un inventario mayor a 50:

```pg
SELECT * FROM productos
WHERE precio BETWEEN 5 AND 15
  AND inventario > 50;
```

#### Seleccionar registros que no cumplan una condición

Selecciona los productos que no tengan la palabra "azul" en su descripción:

```pg
SELECT * FROM productos
WHERE descripcion NOT LIKE '%azul%';
```

### Actualizar datos

```pg
UPDATE productos
SET precio = 15.99
WHERE id = 1;
```

### Eliminar datos

Elimina un registro de la tabla `productos`:


```pg
DELETE FROM productos
WHERE id = 2;
```
<br>

### EJEMPLO 2


**Schema (MySQL v5.7)**

    CREATE TABLE products (
    	id SERIAL PRIMARY KEY,
      	name VARCHAR(100) NOT NULL,
      	description TEXT,
      	price DECIMAL(10, 2) NOT NULL
    );
    
    INSERT INTO products (name, description, price)
    VALUES ('product 1', 'pansito', 3000),
           ('product 2', 'chocolates uwu', 2000),
           ('product 3', 'sopita :3', 5000),
           ('product 4', 'arrosito jej', 4500),
           ('product 5', 'gomitas 7u7', 600),
           ('product 6', 'awuita', 0),
           ('product 7', 'pastas :_', 8000),
           ('product 8', 'carne de res :v', 15000 ),
           ('product 9', 'juguito de mango', 3500),
           ('product 10', 'gaticos con gorritos', 20000)
           
    
    
    
    

---

**Query #1**

    UPDATE products 
    SET name = description
    WHERE price >= 2000;

There are no results to be displayed.

---
**Query #2**

    SELECT * FROM products;

| id  | name                 | description          | price    |
| --- | -------------------- | -------------------- | -------- |
| 1   | pansito              | pansito              | 3000.00  |
| 2   | chocolates uwu       | chocolates uwu       | 2000.00  |
| 3   | sopita :3            | sopita :3            | 5000.00  |
| 4   | arrosito jej         | arrosito jej         | 4500.00  |
| 5   | product 5            | gomitas 7u7          | 600.00   |
| 6   | product 6            | awuita               | 0.00     |
| 7   | pastas :_            | pastas :_            | 8000.00  |
| 8   | carne de res :v      | carne de res :v      | 15000.00 |
| 9   | juguito de mango     | juguito de mango     | 3500.00  |
| 10  | gaticos con gorritos | gaticos con gorritos | 20000.00 |

---

[View on DB Fiddle](https://www.db-fiddle.com/)

**Schema (PostgreSQL v9.4)**

    CREATE TABLE products (
    	id SERIAL PRIMARY KEY,
      	name VARCHAR(100) NOT NULL,
      	description TEXT,
      	category TEXT,
      	price DECIMAL(10,2) NOT NULL,
      	stock INTEGER NOT NULL
    );
    
    INSERT INTO products (name, description, category, price, stock)
    VALUES ('teemo', 'champ mas odiado en lol', 'top', 2000, 300),
    	   ('lux', 'maga chevere xd', 'mid',1500, 200),
           ('miss', 'es guapa :3', 'adc', 4000, 300),
           ('miss', 'es guapa :3', 'adc', 4000, 100);

---

**Query #1**

    SELECT * FROM products;

| id  | name  | description             | category | price   | stock |
| --- | ----- | ----------------------- | -------- | ------- | ----- |
| 1   | teemo | champ mas odiado en lol | top      | 2000.00 | 300   |
| 2   | lux   | maga chevere xd         | mid      | 1500.00 | 200   |
| 3   | miss  | es guapa :3             | adc      | 4000.00 | 300   |
| 4   | miss  | es guapa :3             | adc      | 4000.00 | 100   |

---
**Query #2**

    SELECT * FROM products 
    ORDER BY price, stock ASC;

| id  | name  | description             | category | price   | stock |
| --- | ----- | ----------------------- | -------- | ------- | ----- |
| 2   | lux   | maga chevere xd         | mid      | 1500.00 | 200   |
| 1   | teemo | champ mas odiado en lol | top      | 2000.00 | 300   |
| 4   | miss  | es guapa :3             | adc      | 4000.00 | 100   |
| 3   | miss  | es guapa :3             | adc      | 4000.00 | 300   |

---
**Query #3**

    SELECT * FROM products 
    ORDER BY stock, price ASC;

| id  | name  | description             | category | price   | stock |
| --- | ----- | ----------------------- | -------- | ------- | ----- |
| 4   | miss  | es guapa :3             | adc      | 4000.00 | 100   |
| 2   | lux   | maga chevere xd         | mid      | 1500.00 | 200   |
| 1   | teemo | champ mas odiado en lol | top      | 2000.00 | 300   |
| 3   | miss  | es guapa :3             | adc      | 4000.00 | 300   |

---
**Query #4**

    SELECT * FROM products 
    	WHERE stock > 0
            AND price > 6
        ORDER BY price ASC
        OFFSET 2
        LIMIT 2;

| id  | name | description | category | price   | stock |
| --- | ---- | ----------- | -------- | ------- | ----- |
| 3   | miss | es guapa :3 | adc      | 4000.00 | 300   |
| 4   | miss | es guapa :3 | adc      | 4000.00 | 100   |

---

[View on DB Fiddle](https://www.db-fiddle.com/f/3cCkyVRaDwq29b6THVzfFy/0)
