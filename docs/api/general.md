## General Requests and Responses

Requests that yield an error will have this format:

```js
{
  ok: false,
  data: [/* ...errors */]
}
```

Usually you can use the `ok` parameter to ensure the request was successful or not, for more granular error handling you can match based on the error message. Errors are always passed in as an `Array` in the `data` property.
