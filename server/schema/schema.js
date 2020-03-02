const graphql = require('graphql');
const lodash = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
 } = graphql;
var books = [
  { name: "jixnin", genre: "fantash", id: "1", authorId: "1" },
  { name: "jixnin1", genre: "fantash1", id: "4", authorId: "1" },
  { name: "jixnin2", genre: "fantash2", id: "2", authorId: "2" },
  { name: "jixnin3", genre: "fantash3", id: "3", authorId: "3" }
];
var authors = [
  { name: "yuanshuzhi1", age: 30, id: "1" },
  { name: "yuanshuzhi2", age: 31, id: "2" },
  { name: "yuanshuzhi3", age: 32, id: "3" }
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
            //parent指的是book，按照数据的层级关系确定
           
            return lodash.find(authors,{id:parent.authorId})
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
           console.log(1,parent);
           console.log(books);
          return lodash.filter(books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        // get data from db
        return lodash.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return lodash.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                // mogodb 的model
                let author = new Author({
                    name:args.name,
                    age:args.age
                })
               return author.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})

