# Sales Data Analysis API

This project provides a backend solution for loading, refreshing, and analyzing large historical sales data from CSV files.  
It exposes a RESTful API to trigger data refreshes and retrieve revenue analytics by product, category, and region.

---

## Prerequisites

- *Node.js* (version 16.x or later recommended)  
  Download & install from [https://nodejs.org](https://nodejs.org)  

- *MongoDB* (version 4.x or later)  
  Either a local instance or cloud MongoDB Atlas  
  [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)  

- *NPM* (comes with Node.js)  

---

## Setup Instructions:


    1. Clone the repository
    
    git clone https://github.com/Absara14/sales-revenue-api.git


  2.Install dependencies

    npm install

  3.Configure environment variables

    Create a .env file in the root directory

    MONGO_URI=mongodb://localhost:27017/salesdb

    PORT=5000


  4.Run the server

    npm start

5. Access API

  The server runs on http://localhost:5000 by default.



  

API Usage Guide:

1. POST /api/refresh

This endpoint allows you to manually trigger a data refresh by uploading a CSV file.

Request Body:
{
  "filename": "sample.csv"
}

Response:
{
  "message": "Data refresh started."
}

Use this to reload or update your data from a specified CSV file.

2. GET /api/revenue/total

Retrieves the total revenue generated between a given date range.

Query Parameters:

start: Start date in YYYY-MM-DD format.

end: End date in YYYY-MM-DD format.

Example Response:
{
  "totalRevenue": 1234567.89
}

Use this endpoint to get an aggregated revenue figure over a specified time period.

3. GET /api/revenue/by-product

Returns a list of products along with the total revenue each product generated in the specified date range.
Query Parameters:

start: Start date in YYYY-MM-DD format.

end: End date in YYYY-MM-DD format.

Example Response:
[
  { "product": "UltraBoost Shoes", "revenue": 34567.89 },
  { "product": "Smartwatch X", "revenue": 11234.56 }
]

Use this endpoint to analyze which products performed best over time.

4. GET /api/revenue/by-category

Provides revenue figures grouped by product category for the specified date range.
Query Parameters:

start: Start date in YYYY-MM-DD format.

end: End date in YYYY-MM-DD format.

Example Response:
[
  { "category": "Electronics", "revenue": 98765.43 },
  { "category": "Apparel", "revenue": 54321.00 }
]
