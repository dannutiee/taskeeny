
## To start with client go to /client
- npm install
- npm start

Client runs on: http://localhost:3000/


## To start with server go to /server
-npm install
-npm start

Server runs on: http://localhost:8001/graphql

Graphiql requires "Autorization" header to be added into HTTP HEADERS.
{
  "Authorization": "jwtToken_XXXXXeyJhbGciOiJIUzI1NiIXXXXXXXXXxxxxxxxxxx"
}

It can be grabbed from the "local storage" after login to the application. 


## Development 

### graphql is genereted by codegen in the root directory.
If you want to generate graphql code after changes you need to type: 
- npm run codegen

### Before commit to the repository code should be formatted
- npm run format 






