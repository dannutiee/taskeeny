## Development


graphql is genereted by codegen in the root directory,
you need to type 
- npm install
- npm run codegen


to start with client go to /client
- npm install
- npm start

Client runs on: http://localhost:3000/


to start with server go to /server
-npm install
-npm start

Server runs on: http://localhost:8001/graphql

Graphiql requires "Autorization" header to be added into HTTP HEADERS.
{
  "Authorization": "jwtToken_XXXXXeyJhbGciOiJIUzI1NiIXXXXXXXXXxxxxxxxxxx"
}

It can be grabbed from the "local storage" after login to the application. 



