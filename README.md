
node version: 14.17.6

npm version: 6.14.15

## To start with client go to /client
- ```npm install```
- ```npm start:dev```

Client runs on: http://localhost:3000/


## To start with server go to /server
- ```npm install```
- Then you need to copy **dev.example.ts** file to **dev.ts** replacing the placeholders values with real ones. 
- ```npm start:dev```

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

## Deploy 

**Server**
- Server is hosted on heroku.

From the **root directory** of project run command: 
```git subtree push --prefix server heroku master```

tip:  if the changes require **force** push then run: 
```git push heroku `git subtree split --prefix server master`:master --force```

Changes should be visible on: https://taskeeny-api.herokuapp.com/graphql

**Client**
- Client is hosted on netlify.

From the **/client directory** run command: 
 1. ```npm run build```
 2. ```netlify deploy ```
 3. type **public** in the command line
 4. Netlify will return the link to stg. Check it and if your changes work on it  then run the command returned from netlify to push your changes on production.

 Changes should be visilbe on: https://taskeeny.netlify.app








