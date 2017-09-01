## Changing User Passwords

Changing user passwords will forcibly delete all existing session tokens created for that user and you will need to generate a new one.

PATH: /user/change-password
METHOD: POST

#### Fields
* token
* currentPassword
* newPassword
* newPasswordConfirmation (should match newPassword)

#### Response

A successful response will have this format:
```js
{
    "ok": true,
    "data": "password changed"
}
```

An unsuccessful response will have this format:
```js
{
    "ok": false,
    "data": ["Invalid token"]
}
```
