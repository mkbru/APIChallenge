

## Getting Started

----

**Authentication**

Requests made to the API must have the following headers:

        'content-type' :  'application/json'

        'authorization' : 'qQWrg*Ws+/MS2#>!QQf89r!(8g~ePA'

**Deploying Locally**

![alt text](https://github.com/mkbru/APIChallenge/blob/master/images/npm-start.png)


**Run Tests**

![alt text](https://github.com/mkbru/APIChallenge/blob/master/images/npm-test.png)

**Make Requests**

**API Instructions**
----
  Table of Contents
  
  
  2. [Shops](#2.1-create-shop)
  
        2.1 [Create Shop](#2.1-create-shop)
        
        2.2 [Read Shop](#2.2-read-shops)
        
        2.3 [Read Shops](#2.3-read-shop)
        
        2.4 [Update Shop](#2.4-update-shop)
        
        2.5 [Delete Shop](#2.5-delete-shop)
  
  3. [Products]()
  
        3.1 [Create Product](#3.1-create-product)
        
        3.2 [Read Products](#3.2-read-products)
        
        3.3 [Read Product](#3.3-read-product)
        
        3.4 [Update Product](#3.4-update-product)
        
        3.5 [Delete Product](#3.5-delete-product)
  
  4. [Orders]()

        4.1 [Create Order](#4.1-create-order)
        
        4.2 [Read Orders](#4.2-read-orders)
        
        4.3 [Read Order](#4.3-read-order)
        
        4.4 [Update Order](#4.4-update-order)
        
        4.5 [Delete Order](#4.5-delete-order)



## 2.1 Create Shop

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
  

## 2.2 Read Shops

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


## 2.3 Read Shop

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

## 2.4 Update Shop

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


## 2.5 Delete Shop

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
  

## 3.1 Create Product

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

## 3.2 Read Products

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
  
## 3.3 Read Product

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


## 3.4 Update Product

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


## 3.5 Delete Product

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


## 4.1 Create Order

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
  
## 4.2 Read Orders

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


## 4.3 Read Order

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


## 4.4 Update Order

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

## 4.5 Delete Order

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

