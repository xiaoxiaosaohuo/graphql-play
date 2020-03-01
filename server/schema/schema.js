const graphql = require('graphql');
const lodash = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
var books=[
    {name:"jixnin",genre:'fantash',id:'1'},
    { name: "jixnin2", genre: 'fantash2', id: '2' },
    { name: "jixnin3", genre: 'fantash3', id: '3' }
]
const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        genre: { type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parent,args){
                // get data from db
                return lodash.find(books,{id:args.id});
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query:RootQuery
})

