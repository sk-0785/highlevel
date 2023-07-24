# Transaction-management web application

## Getting started

This projects includes basic CRUD operation on wallets. This project is developed on **react.js** and backend powered on **NodeJs** and **MongoDB** as database.

## Features

- Creation of new wallet.
- creation of transaction on wallet 
- Fetch wallets details by id
- fetch all the transactions on th wallet


## Software and framework Requirements

- React.js 
- Express.js
- cors
- dotenv
- mongoose
- express-validator
- Node.js
- MongoDB

## How to setup the FE project

- Clone the  project from github.
- go to highelevelFE folder  thrugh the terminal
- Run npm install.
- Finally run npm start.

## How to setup the BE project

- Clone the project from github.
- Create .env file in root folder and copy value from infra/development.env into .env file.
- make sure mongo is running locally if you want to use local db and paste the local mongo url in .env file
- Run npm install.
- Finally run npm run start.
## APIS curl


setup wallet api 
```json
curl --location --request POST 'highlevel-backend-1ndk.onrender.com/api/wallet' \
--header 'Accept: application/json, text/plain, */*' \
--header 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8' \
--header 'Connection: keep-alive' \
--header 'Origin: http://localhost:3000' \
--header 'Referer: http://localhost:3000/' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: same-site' \
--header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' \
--header 'sec-ch-ua: "Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'sec-ch-ua-platform: "macOS"' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"<give_name>",
    "balance":34
}'
```

wallet details api 
```json
curl --location --request GET 'highlevel-backend-1ndk.onrender.com/api/wallet/64bec33e40380f004c933e9b' \
--header 'Accept: application/json, text/plain, */*' \
--header 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8' \
--header 'Connection: keep-alive' \
--header 'Origin: http://localhost:3000' \
--header 'Referer: http://localhost:3000/' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: same-site' \
--header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' \
--header 'sec-ch-ua: "Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'sec-ch-ua-platform: "macOS"' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"cvg",
    "balance":34
}'
```

execute transaction api
```json
curl --location --request POST 'highlevel-backend-1ndk.onrender.com/api/transaction/64bec33e40380f004c933e9b' \
--header 'Accept: application/json, text/plain, */*' \
--header 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8' \
--header 'Connection: keep-alive' \
--header 'Origin: http://localhost:3000' \
--header 'Referer: http://localhost:3000/' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: same-site' \
--header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' \
--header 'sec-ch-ua: "Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'sec-ch-ua-platform: "macOS"' \
--header 'Content-Type: application/json' \
--data-raw '{
    "description":"cvg",
    "amount":34
}'
```

fetch transactions api
```json
curl --location --request GET 'highlevel-backend-1ndk.onrender.com/api/transaction?walletId=64bec33e40380f004c933e9b&skip=0&limit=3' \
--header 'Accept: application/json, text/plain, */*' \
--header 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8' \
--header 'Connection: keep-alive' \
--header 'Origin: http://localhost:3000' \
--header 'Referer: http://localhost:3000/' \
--header 'Sec-Fetch-Dest: empty' \
--header 'Sec-Fetch-Mode: cors' \
--header 'Sec-Fetch-Site: same-site' \
--header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' \
--header 'sec-ch-ua: "Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'sec-ch-ua-platform: "macOS"' \
--header 'Content-Type: application/json' \
--data-raw '{
    "description":"cvg",
    "amount":34
}'
```

## Changes required before deploying it to production:

    - Instead of using express.js we can use Nest.js to implement the more robust system.
    - Authentication system must be implemented.
    - Implementation of logging system.
    - User management system should also be implemented.
    - More test case should be implemented.



## Database

We are using mongodb as a database.We have 2 collections whose schema can be found in /models folder.


