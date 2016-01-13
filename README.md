# api-response-middleware

Express.js response formatting middleware

## Installation

```sh
$ npm install api-response-middleware
```

## API

```js
var responseMiddleware = require('api-response-middleware');
app.use(responseMiddleware(options)); //App is an Express.js app. Pass in options
```

## Options

The function takes an option options object that may contain any of the following keys:

**failCodes**

An array of HTTP status codes that should be treated as 'fail', instead of 'error' (more on this below)

## Response formats

This middleware attaches a few new methods to the Express 'res' object. These methods will send a response in one of three formats - **Success, Fail, or Error**


##### Succcess format:
```json
{
    "status":"success",
	"payload":{}
}
```

##### Fail format:
```json
{
    "status":"fail",
	"message":"Oops!"
}
```

##### Error format:
```json
{
    "status":"error",
	"message":"Oops!"
}
```

# Methods

#### res.apiResponse(response)

#### res.apiResponse(err, message, code, forceFail)

#### res.apiNotFound(err, message)

#### res.apiNotAllowed(err, message)



