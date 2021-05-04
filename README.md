
## To start with client go to /client
- ```npm install```
- ```npm start```

Client runs on: http://localhost:3000/


## To start with server go to /server
- ```npm install```
- ```npm start```

Server runs on: http://localhost:8001/graphql

To start play with graphiql you need to add **Autorization** header into **HTTP HEADERS**.
```
{
  "Authorization": "jwtToken_XXXXXeyJhbGciOiJIUzI1NiIXXXXXXXXXxxxxxxxxxx"
}
```

It can be grabbed from the **local storage** after login to the application. 


## Development 

To generate code from your GraphQL schema you need to use **codegen**.
You can do that with command listed below. Run it from **root** directory of the project.
- ```npm run codegen```

Before commit to the repository code should be formatted
- ```npm run format```






