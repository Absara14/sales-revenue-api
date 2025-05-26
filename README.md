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

## Setup Instructions

1. *Clone the repository*

   ```bash
   git clone https://github.com/Absara14/sales-revenue-api.git

2.Install dependencies
    npm install

3.Configure environment variables

   Create a .env file in the root directory:

   MONGO_URI=mongodb://localhost:27017/salesdb
   PORT=5000

4.Run the server
    npm start


5. Access API

     The server runs on http://localhost:5000 by default.
