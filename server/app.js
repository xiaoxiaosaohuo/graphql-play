const express = require("express");
const graphqlHttp = require("express-graphql");
const schema = require('./schema/schema.js');
const app = express();

app.use("/graphql", graphqlHttp({
    schema,
    graphiql: true,
}));

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
