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
    GraphQLNonNull,
    GraphQLSchema
 } = graphql;

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
           
            // return lodash.find(authors,{id:parent.authorId})
            return Author.findById(parent.authorId);
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
           console.log(parent, args);
        //    console.log(books);
        //   return lodash.filter(books, { authorId: parent.id });
          return Book.find({ authorId: parent._id });
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
        // return lodash.find(books, { id: args.id });
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // return lodash.find(authors, { id: args.id });
         return Autor.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        // mogodb 的model
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})

