<link href="/css/markdown.css" rel="stylesheet"></link>

## API Challenge

Give description about this project and maybe tech stalk.

----

**Testing the API**

* [Advanced Rest Client (Personal Favourite)](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo)

* [Postman](https://www.getpostman.com/apps)

* curl

**Authentication**

Requests made to the API MUST have the following headers:

        'content-type' :  'application/json'

        'authorization' : 'qQWrg*Ws+/MS2#>!QQf89r!(8g~ePA'

**Deploying Locally**

![alt text](https://github.com/mkbru/APIChallenge/blob/master/images/npm-start.png)


**Run Tests**

![alt text](https://github.com/mkbru/APIChallenge/blob/master/images/npm-test.png)


**API Instructions**
----
  
| Shops API |Method| 
|------------- | -------------   | 
|[Create a new Shop](#createshop)        |`/Post `     |
|[Fetch all Shops](#fetchshop)          |`/Get  `    |
|[Fetch a Shop by ID]() |`/Get `     |
|[Update a Shop by ID]() |`/Update `   |
|[Delete a Shop by ID]() |`/Delete`    |
  
| Products API  |Method| 
| ------------- | -------------   | 
|[Create a new Product]()        |`/Post  `    |
|[Fetch all Products]()          |`/Get`      |
|[Fetch a Produt by ID]() |`/Get    `  |
|[Update a Product by ID]() |`/Update `   |
|[Delete a Product by ID]() |`/Delete   ` |

| Orders API  |Method| 
| ------------- | -------------   | 
|[Create a new Order]()        |`/Post   `   |
|[Fetch all Orders]()          |`/Get `     |
|[Fetch an order by ID]() |`/Get  `    |
|[Update an order by ID]() |`/Update `   |
|[Delete an order by ID]() |`/Delete  `  |
  


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
            "shopName" : "Snowboard Shop"
        }

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{	
                    	"shopId" : 5,
                   	"shopName" : "Snowboard Shop"
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


<a name="fetchshop" />   

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
                  "shop_name": "Camping Shop"
                  },
                    {
                  "shop_id": 2,
                  "shop_name": "Clothing Shop"
                  }`
 
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
                  "shop_name": "Camping"
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
            "shopName" : "Tennis Shop"
        }

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "message": "updated shop",
                  "shopName": "Tennis Shop"
                  }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{"error": "shop doesn't exist"}`
   


* **Sample Call:**

         {
            url: "/products/1",
            Content-Type: "application/json",
            type : "PUT",
            body :  {   
                        "shopName" : "Tennis Shop"
                    }
         }
* **Notes:**


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
            "productName" : "Snowboard",
            "productPrice" : 500,
            "shopId" : 1
        }

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                  "message": "added new product",
                  "productName": "Snowboard",
                  "productPrice": 500
                  }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br /> 
    **Content:**  `{"HTTP/1.1": "401 Unauthorized", "Date": "2018-09-12T17:16:41.183Z"}`
   
   OR
   
  * **Code:** 200 <br /> 
    **Content:**  `{"error": "product already exists"}`
   


* **Sample Call:**

         {
            url: "/products",
            Content-Type: "application/json",
            type : "POST",
            body : {
                {
                    "productId" : 100,
                    "productName" : "Snowboard",
                    "productPrice" : 500,
                    "shopId" : 1
                }
            }
         }
* **Notes:**

  In the current design it is the clients responsibility to generate the product ID.

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
                  "product_id": 1,
                  "product_name": "burton snowboard",
                  "product_price": 450,
                  "shop_id": 1
                  },
                    {
                  "product_id": 2,
                  "product_name": "burton boots",
                  "product_price": 400,
                  "shop_id": 1
                  },
                    {
                  "product_id": 3,
                  "product_name": "capita snowboard",
                  "product_price": 250,
                  "shop_id": 1
                  },`
 
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
                  "product_id": 2,
                  "product_name": "burton boots",
                  "product_price": 400,
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
            "productName" : "snowboard",
            "productPrice" : 505
        }

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{
                   	"productName" : "snowboard",
                     "productPrice" : 505
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
            type : "PUT",
            body :  {   
                        "productName" : "snowboard",
                        "productPrice" : 505
                    }
         }
* **Notes:**


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

  The order Id is generated by the client.
  
  The order cannot contain items from multiple shops.
  
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
        	"orderId" : 1,
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
            url: "/products/1",
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

