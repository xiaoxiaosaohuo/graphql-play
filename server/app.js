const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require("graphql");

const schema = require('./shcema/schema');
const app = express();


// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// const root = { hello: (args) => {console.log(args);return 'Hello world!' }};


app.use('/graphql', graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));