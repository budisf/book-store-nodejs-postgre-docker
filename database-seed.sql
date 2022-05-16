CREATE TABLE employees
(
    id SERIAL,
    name text,
    title text,
    CONSTRAINT employees_pkey PRIMARY KEY (id)
);

INSERT INTO employees(name, title) VALUES
 ('Meadow Crystalfreak ', 'Head of Operations'),
 ('Buddy-Ray Perceptor', 'DevRel'),
 ('Prince Flitterbell', 'Marketing Guru');

 CREATE TABLE books
(
    id SERIAL,
    title text,
    author_id text,
    stock integer,
    price float,
    cover text,
    created_time timestamp,
    CONSTRAINT books_pkey PRIMARY KEY (id)
);

 CREATE TABLE authors
(
    id SERIAL,
    name text,
    pen_name text,
    email text,
    is_disabled boolean,
    password text,
    updated_time timestamp,
    created_time timestamp,
    CONSTRAINT authors_pkey PRIMARY KEY (id)
);

 CREATE TABLE sales
(
    id SERIAL,
    recipient_name text,
    recipient_email text,
    book_title text,
    author_id text,
    book_id text,
    quantity integer,
    price_per_unit float,
    price_total float,
    created_time timestamp,
    CONSTRAINT sales_pkey PRIMARY KEY (id)
);