### EDIT: this project is not maintained anymore as for 2023+

node version: 14.17.6

npm version: 6.14.15

## To start with client go to /client

- `npm install`
- `npm run start:dev`

Client runs on: http://localhost:3000/

## To start with server go to /server

- `npm install`
- Then you need to copy **dev.example.ts** file to **dev.ts** replacing the placeholders values with real ones.
- `npm run start:dev`

Server runs on: http://localhost:8001/graphql

To start play with graphiql you need to add **Autorization** header into **HTTP HEADERS**

```
{
  "Authorization": "jwtToken_XXXXXeyJhbGciOiJIUzI1NiIXXXXXXXXXxxxxxxxxxx"
}
```

It can be grabbed from the **local storage** after login to the application.

## Development

To generate code from your GraphQL schema you need to use **codegen**.
You can do that with command listed below. Run it from **root** directory of the project.

- `npm run codegen`

Before commit to the repository code should be formatted

- `npm run format`

Server uses mongoDB as database so to play with this app you need to have an account on MongoDB.

<a href="https://www.mongodb.com/lp/cloud/atlas/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_general_prosp-brand_gic-null_emea-pl_ps-all_desktop_eng_lead&utm_term=mongo%20db%20tutorial&utm_medium=cpc_paid_search&utm_ad=p&utm_ad_campaign_id=10947982926&adgroup=108885991393&cq_cmp=10947982926&gad_source=1&gclid=CjwKCAjw4f6zBhBVEiwATEHFVvTUfSupVh47ZyYwe8JOEj728Fzn1ysU7Ca3A7n0SLnTrQdScJPswRoC3RIQAvD_BwE">MongoDB</a>

Once you have an account you need to create a cluster and get the connection string and secret-key which you need to use in dev.ts file.
Please find dev.example.ts file in this repo, copy it and change the name to dev.ts. Replace MONGODB,SECRET_KEY values with the onces that you get from your cluster.

## Deploy

**Server**

- Server is hosted on heroku.

From the **root directory** of project run command:
`git subtree push --prefix server heroku master`

tip: if the changes require **force** push then run:
`` git push heroku `git subtree split --prefix server master`:master --force ``

Changes should be visible on: https://taskeeny-api.herokuapp.com/graphql

**Client**

- Client is hosted on netlify.

From the **/client directory** run command:

1.  `npm run build`
2.  `netlify deploy `
3.  type **public** in the command line
4.  Netlify will return the link to stg. Check it and if your changes work on it then run the command returned from netlify to push your changes on production.

Changes should be visilbe on: https://taskeeny.netlify.app

## Enjoy

https://user-images.githubusercontent.com/24780078/137640816-7d6028e5-f8e2-4bc3-b7de-a5af7af49c62.mov
