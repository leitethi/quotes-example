# quotes-example

## running the app

npm i

npm start

## request samples

curl --location --request GET 'http://localhost:3000/route/GRU/SCL'

curl --location --request POST 'http://localhost:3000/route' \
--header 'Content-Type: application/json' \
--data-raw '{
    "from": "BRC",
    "to": "SCL",
    "price": 5
}'

## running tests

npm test
