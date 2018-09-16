
<a name="top" /> 

## API Challenge

This is the API designed for the Developer intern challenge.

The API is written using the Node.js/Express framework and MySQL database.

The application is running publicly on kubernetes and can be accessed on <ip>


----

**Testing the API**

* [Advanced Rest Client (Personal Favourite)](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo)

* [Postman](https://www.getpostman.com/apps)

* curl

**Authentication**

Requests made to the API MUST have the following headers:

        'Accept' : 'application/json'

        'Authorization' : 'qQWrg*Ws+/MS2#>!QQf89r!(8g~ePA'
        
        'Content-type' :  'application/json'
        
Below is an example of a request made to the API using the Advanced Rest Client tool.

![](https://media.giphy.com/media/33ItuPfXLjSIFMSblW/giphy.gif)

**Deploying Locally**

![](https://media.giphy.com/media/2imOv2hRva5aJIsnZO/giphy.gif)


**Run Tests**

![](https://media.giphy.com/media/ki8t9nCD3JDVqMOAFm/giphy.gif)


**API Instructions**
----
  
| Shops API |Method| 
|------------- | -------------   | 
|[Create a new Shop](#createshop)        |`/Post `     |
|[Fetch all Shops](#fetchshops)          |`/Get  `    |
|[Fetch a Shop by ID](#fetchshop) |`/Get `     |
|[Update a Shop by ID](#updateshop) |`/Update `   |
|[Delete a Shop by ID](#deleteshop) |`/Delete`    |
  
| Products API  |Method| 
| ------------- | -------------   | 
|[Create a new ProductInterface](#createproduct)        |`/Post  `    |
|[Fetch all Products](#fetchproducts)          |`/Get`      |
|[Fetch a Produt by ID](#fetchproduct) |`/Get    `  |
|[Update a ProductInterface by ID](#updateproduct) |`/Update `   |
|[Delete a ProductInterface by ID](#deleteproduct) |`/Delete   ` |

| Orders API  |Method| 
| ------------- | -------------   | 
|[Create a new Order](#createorder)        |`/Post   `   |
|[Fetch all Orders](#fetchorders)          |`/Get `     |
|[Fetch an order by ID](#fetchorder) |`/Get  `    |
|[Update an order by ID](#updateorder) |`/Update `   |
|[Delete an order by ID](#deleteorder) |`/Delete  `  |
  


<a name="createshop" /> 

## Create a new Shop 

----

  Adds a new shop.

* **URL**

  /shops

* **Method:**

  `POST` 
  
*  **URL Params**

    None

* **Data Params**

        {
            "shopId" : 5,
            "name" : "Snowboard Shop"
        }

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "message": "added shop",
                  "name": "Snowboard Shop"
                  }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{"error": "shop already exists"}`
   


* **Sample Call:**

         {
            url: "/shops",
            Content-Type: "application/json",
            type : "POST",
            body : {
                "shopId" :51,
                "shopName" : "snowboard"
            }
         }
* **Notes:**

  In the current design it is the clients responsibility to generate the shop ID.


<a name="fetchshops" />   

## Fetch all Shops 

----
  Returns json data about all shops.

* **URL**

  /shops

* **Method:**

  `GET` 
  
*  **URL Params**

   None


* **Data Params**

   None

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "shop_id": 1,
                  "name": "Snowboarding Shop"
                  },
                    {
                  "shop_id": 2,
                  "name": "Clothing Shop"
                  },`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`


* **Sample Call:**

         {
            url: "/shops",
            Content-Type: "application/json",
            type : "GET"
         }
* **Notes:**

  The call to /shops will fetch all shops

<a name="fetchshop" /> 

## Shops API : Fetch a Shop by ID 

----
  Returns json data about a single shop.

* **URL**

  /shops/:shopId

* **Method:**

  `GET` 
  
*  **URL Params**

   **Required:**
    
   `shopId=[integer]`

* **Data Params**

   None

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "shop_id": 1,
                  "name": "Snowboarding Shop"
                  }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{"error": "shop doesn't exist"}`
   


* **Sample Call:**

         {
            url: "/shops/1",
            Content-Type: "application/json",
            type : "GET"
         }
* **Notes:**

<a name="updateshop" /> 

## Shops API : Update a Shop by ID

----
  Updates a product price or name.

* **URL**

  /shops/:shopId

* **Method:**

  `PUT` 
  
*  **URL Params**

   **Required:**
    
   `shopId=[integer]`

* **Data Params**

        {   
            "name" : "Tennis Shop"
        }

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "message": "updated shop",
                  "id": "1"
                  }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{"error": "shop doesn't exist"}`
   


* **Sample Call:**

         {
            url: "/shops/1",
            Content-Type: "application/json",
            type : "PUT",
            body :  
                {   
                "shopName" : "Tennis Shop"
                }
         }
* **Notes:**

<a name="deleteshop" /> 

## Shops API : Delete a Shop by ID

----
  Delete a specified shop.

* **URL**

  /shops/:shopId

* **Method:**

  `DELETE` 
  
*  **URL Params**

   **Required:**
    
   `productId=[integer]`

* **Data Params**

   None

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "message": "deleted shop",
                  "shopId": "2"
                  }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{"error": "shop doesn't exist"}`
   


* **Sample Call:**

         {
            url: "/shops/1",
            Content-Type: "application/json",
            type : "DELETE"
         }
* **Notes:**

  Deleting a shop will delete any products or orders tied to it.
  
<a name="createproduct" />   

## Products API : Create a new Product

----
  Adds a new product to a specified shop.

* **URL**

  /products

* **Method:**

  `POST` 
  
*  **URL Params**

    None

* **Data Params**

        {
            "productId" : 100,
            "name" : "Snowboard",
            "price" : 500,
            "inventory": 25,
            "shopId" : 1
        }

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "message": "added new product",
                  "name": "Snowboard",
                  "price": 500,
                  "inventory": 50
                  }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{"error": "product already exists"}`
    
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{"error": "shop does not exist"}`
        
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{
                   "error": "all fields must be set",
                   "fields": "productID,name,price,inventory,shopId"
                   }`
   


* **Sample Call:**

         {
            url: "/products",
            Content-Type: "application/json",
            type : "POST",
            body : {
                {
                    "productId" : 100,
                    "name" : "Snowboard",
                    "price" : 500,
                    "inventory": 50,
                    "shopId" : 1
                }
            }
         }
* **Notes:**

  For simplicity the client should provide the product UID.
  
  Added inventory field to product to extend base functionality, as this is most likely important information in e-commerce systems.

<a name="fetchproducts" />     

## Products API : Fetch all Products 

----
  Returns json data about all products.

* **URL**

  /products

* **Method:**

  `GET` 
  
*  **URL Params**

   None


* **Data Params**

   None

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "products": [
                    {
                  "productId": 1,
                  "name": "Burton Snowboard",
                  "price": 450,
                  "inventory": 100,
                  "shopId": 1
                  },
                   {
                  "productId": 2,
                  "name": "Burton Boots",
                  "price": 399.99,
                  "inventory": 150,
                  "shopId": 1
                  }
                  }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`


* **Sample Call:**

         {
            url: "/products",
            Content-Type: "application/json",
            type : "GET"
         }
* **Notes:**

  The call to /products will fetch all products from all shops

<a name="fetchproduct" />     
  
## Products API : Fetch a Product by ID 

----
  Returns json data about a single product.

* **URL**

  /products/:productId

* **Method:**

  `GET` 
  
*  **URL Params**

   **Required:**
    
   `productId=[integer]`

* **Data Params**

   None

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "product_id": 4,
                  "name": "Forum Snowboard",
                  "price": 369.79,
                  "inventory": 50,
                  "shop_id": 1
                  }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{"error": "product doesn't exist"}`
   


* **Sample Call:**

         {
            url: "/products/2",
            Content-Type: "application/json",
            type : "GET"
         }
* **Notes:**


<a name="updateproduct" />     

## Products API : Update a Product by ID 

----
  Updates a product price or name.

* **URL**

  /products/:productId

* **Method:**

  `PUT` 
  
*  **URL Params**

   **Required:**
    
   `productId=[integer]`

* **Data Params**

        {
          "name" : "skis",
          "price": 200,
          "inventory":50
        }

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "message": "updated product",
                  "name": "skis",
                  "price": 200
                  }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{"error": "product doesn't exist"}`
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{
                   "error": "all fields must be set",
                   "fields": "name,price,inventory"
                   }`
   


* **Sample Call:**

         {
            url: "/products/1",
            Content-Type: "application/json",
            type : "PUT",
            body :
                {
                  "name" : "skis",
                  "price": 200,
                  "inventory":50
                }
         }
* **Notes:**

<a name="deleteproduct" />     

## Products API : Delete a Product by ID 

----
  Delete a specified product.

* **URL**

  /products/:productId

* **Method:**

  `DELETE` 
  
*  **URL Params**

   **Required:**
    
   `productId=[integer]`

* **Data Params**

   None

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "message": "deleted product",
                  "productId": "2"
                  }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{"error": "product doesn't exist"}`
   


* **Sample Call:**

         {
            url: "/products/1",
            Content-Type: "application/json",
            type : "DELETE"
         }
* **Notes:**

<a name="createorder" />     

## Orders API : Create a new Order

----
  Adds a new order line item.

* **URL**

  /orders

* **Method:**

  `POST` 
  
*  **URL Params**

    None

* **Data Params**

        {
            "orderId" : 4,
            "productId" : 10,
            "quantity" : 2,
            "shopId" : 2
        }

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "message": "added order item",
                  "orderId": 4,
                  "productId": 10,
                  "quantity": 2
                  }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{
                   "error": "not enough inventory in stock",
                   "amount requested": 200
                   }`
   OR              
   
  * **Code:** 200 <br /> 
    **Content:**  `{
                   "error": "shop not found"
                   }`

   OR              
   
  * **Code:** 200 <br /> 
    **Content:**  `{
                   "error": "product not found in this shop"
                   }`            
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{
                   "error": "product already in order",
                   "message": "use /PUT to update product quantities /DELETE to delete a product"
                   }`

   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{
                   "error": " cannot add products from multiple shops on one order"
                   }`
                   
                   
* **Sample Call:**

         {
            url: "/orders",
            Content-Type: "application/json",
            type : "POST",
            body : {
                "orderId" : 4,
                "productId" : 10,
                "quantity" : 2,
                "shopId" : 2
            }
         }
* **Notes:**

  The order Id needs to be generated by the client.
  
  The order cannot contain items from multiple shops.
  
<a name="fetchorders" />
      
## Orders API : Fetch all Orders

----
  Returns json data about all orders.

* **URL**

  /orders

* **Method:**

  `GET` 
  
*  **URL Params**

   None


* **Data Params**

   None

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "order": {
                  "orderId": 1,
                  "orderTotal": 286,
                  "products": [
                    {
                  "productName": "american eagle t-shirt",
                  "productPrice": 26,
                  "quantity": 1,
                  "subtotal": 26
                  },
                    {
                  "productName": "levis jeans",
                  "productPrice": 70,
                  "quantity": 1,
                  "subtotal": 70
                  },
                    {
                  "productName": "nike shoes",
                  "productPrice": 100,
                  "quantity": 1,
                  "subtotal": 100
                  },
                    {
                  "productName": "MEC shorts",
                  "productPrice": 45,
                  "quantity": 2,
                  "subtotal": 90
                  }
                  ],
                  "shopId": 2
                  }
                  },`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`


* **Sample Call:**

         {
            url: "/orders",
            Content-Type: "application/json",
            type : "GET"
         }
* **Notes:**

<a name="fetchorder" />
      
## Orders API : Fetch an Order by ID

----
  Returns json data about a single order.

* **URL**

  /order/:orderId

* **Method:**

  `GET` 
  
*  **URL Params**

   **Required:**
    
   `orderId=[integer]`

* **Data Params**

   None

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "order": {
                  "orderId": 3,
                  "orderTotal": 60,
                  "products": [
                    {
                  "productName": "burton t-shirt",
                  "productPrice": 30,
                  "quantity": 2,
                  "subtotal": 60
                  }
                  ],
                  "shopId": 2
                  }
                  }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{"error": "order doesn't exist"}`
   


* **Sample Call:**

         {
            url: "/orders/1",
            Content-Type: "application/json",
            type : "GET"
         }
* **Notes:**

<a name="updateorder" />
      
## Orders API : Update an Order by ID

----
  Updates a product price or name.

* **URL**

  /orders/:orderId

* **Method:**

  `PUT` 
  
*  **URL Params**

   **Required:**
    
   `productId=[integer]`

* **Data Params**

        {
          	"productId" : 6,
          	"quantity" : 3
        }

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "message": "update product quantity",
                  "orderId": 1,
                  "productId": 6,
                  "quantity": 3
                  }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{"error": "product not found on order"}`
   


* **Sample Call:**

         {
            url: "/orders/1",
            Content-Type: "application/json",
            type : "PUT",
            body :  
                {
                    "orderId" : 1,
                    "productId" : 6,
                    "quantity" : 3
                }
         }
* **Notes:**

<a name="deleteorder" />
      
## Orders API : Delete an Order by ID

----
  Delete a specified product.

* **URL**

  /orders/:orderId

* **Method:**

  `DELETE` 
  
*  **URL Params**

   **Required:**
    
   `orderId=[integer]`

* **Data Params**

   None

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "message": "deleted order",
                  "orderId": "2"
                  }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{"error": "order doesn't exist"}`
   


* **Sample Call:**

         {
            url: "/orders/1",
            Content-Type: "application/json",
            type : "DELETE"
         }
* **Notes:**

