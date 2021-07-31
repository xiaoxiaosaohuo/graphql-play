const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType,GraphQLString,GraphQLSchema ,GraphQLID,GraphQLInt,GraphQLList} = graphql;

const books = [
  {name:"harry",genre:'fa',id:'1',authorId:"1"},
  {name:"react",genre:'hooks',id:'2',authorId:"2"}
]
const authors = [
  { name: "jinxin", age: 22, id: "1" },
  { name: "ysz", age: 21, id: "2" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author:{
      type:AuthorType,
      resolve(parent,args){
        console.log("BookType", parent);
        return _.find(authors, { id: parent.authorId});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent,args){

        return  _.filter(books,{authorId:parent.id})
      }
    }
  })
});


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log("resolve", parent, args);
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log("resolve", parent, args);
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent,args){
        return books
      }
    }
  }
});

module.exports = new GraphQLSchema({query:RootQuery});