## Authentication
Authenticating API users is done by generating a token and providing that token in all future requests that require it.

PATH: /session


METHOD: POST

#### Fields
All fields are required

* username
* password

#### Response

A successful response has the following format:
```js
{
    "ok": true,
    "data": {
        "user_id": 1,
        "token": "2f607205bd148ad5e18d071d66186553",
        "username": "sean"
    }
}
```

An error has the following format:
```js
{
    "ok": false,
    "data": [
        "Incorrect username or password"
    ]
}
```

When authenticating for future requests, depending on the request method you can pass the token as a query parameter or in the POST payload as `x-www-form-urlencoded`
