const express = require("express");
const graphqlHttp = require("express-graphql");
const schema = require('./schema/schema.js');
const mongoose = require('mongoose');

const app = express();
// 连接数据库

mongoose.connect(
  "mongodb://graph:jinxin479@ds111565.mlab.com:11565/jinxin"
);
mongoose.connection.once('open',()=>{
    console.log('connected to database')
})
app.use("/graphql", graphqlHttp({
    schema,
    graphiql: true,
}));

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
