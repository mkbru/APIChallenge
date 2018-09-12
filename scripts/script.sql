use sql9256245;

create table shops(
	shop_id INT primary key,
	shop_name VARCHAR(255) 
);

create table products(
	product_id INT primary key,
	product_name VARCHAR(255) NOT NULL,
	product_price INT NOT NULL,
	shop_id int not null,
	FOREIGN KEY fk_shop(shop_id)
	REFERENCES shops(shop_id)
);

create table orders(
	order_id INT not null,
	product_id INT not null,
    shop_id INT not null,
	quantity INT,
	FOREIGN KEY fk_products(product_id)
	REFERENCES products(product_id),
    FOREIGN KEY fk_shops(shop_id)
	REFERENCES shops(shop_id),
	PRIMARY KEY(order_id,product_id)
);

insert into shops(shop_id,shop_name) values (1,'snowboarding');
insert into shops(shop_id,shop_name) values (2,'clothing');
insert into shops(shop_id,shop_name) values (3,'camping');
insert into shops(shop_id,shop_name) values (4,'yoga');

insert into products(product_id,product_name,product_price,shop_id) values (1,'burton snowboard',450,1);
insert into products(product_id,product_name,product_price,shop_id) values (2,'burton boots',399.99,1);
insert into products(product_id,product_name,product_price,shop_id) values (3,'capita snowboard',250,1);
insert into products(product_id,product_name,product_price,shop_id) values (4,'forum snowboard',369.79,1);
insert into products(product_id,product_name,product_price,shop_id) values (5,'oakley goggles',159.99,1);

insert into products(product_id,product_name,product_price,shop_id) values (6,'american eagle t-shirt',25.99,2);
insert into products(product_id,product_name,product_price,shop_id) values (7,'levis jeans',69.99,2);
insert into products(product_id,product_name,product_price,shop_id) values (8,'nike shoes',100,2);
insert into products(product_id,product_name,product_price,shop_id) values (9,'MEC shorts',45,2);
insert into products(product_id,product_name,product_price,shop_id) values (10,'burton t-shirt',29.99,2);

insert into products(product_id,product_name,product_price,shop_id) values (11,'quick setup tent',150,3);
insert into products(product_id,product_name,product_price,shop_id) values (12,'camping chairs',100,3);
insert into products(product_id,product_name,product_price,shop_id) values (13,'merell hiking boots',150,3);
insert into products(product_id,product_name,product_price,shop_id) values (14,'fishing rod',80,3);
insert into products(product_id,product_name,product_price,shop_id) values (15,'mosquito repellent',9.99,3);

insert into products(product_id,product_name,product_price,shop_id) values (16,'lulu lemon t-shirt',45.99,4);
insert into products(product_id,product_name,product_price,shop_id) values (17,'yoga socks',13.99,4);
insert into products(product_id,product_name,product_price,shop_id) values (18,'foam roller',25,4);
insert into products(product_id,product_name,product_price,shop_id) values (19,'water bottle',10,4);
insert into products(product_id,product_name,product_price,shop_id) values (20,'yoga block',15,4);


insert into orders(order_id,product_id,shop_id,quantity) values (1,6,2,1);
insert into orders(order_id,product_id,shop_id,quantity) values (1,7,2,1);
insert into orders(order_id,product_id,shop_id,quantity) values (1,8,2,1);
insert into orders(order_id,product_id,shop_id,quantity) values (1,9,2,2);

insert into orders(order_id,product_id,shop_id,quantity) values (2,16,4,1);
insert into orders(order_id,product_id,shop_id,quantity) values (2,19,4,3);
insert into orders(order_id,product_id,shop_id,quantity) values (2,20,4,2);