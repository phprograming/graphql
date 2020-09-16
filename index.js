const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const { ApolloServer, gql } = require('apollo-server-express');

// Rest
app.use(bodyParser.json());
app.use(routes);

// Graphql
const typeDefs = gql `
    type Query {
        getAllProducts: [Product]
    }
    type Product {
        id: String
        name: String
    }
    type Mutation {
        createProduct(input: ProductInput): Product
    }
    input ProductInput {
        id: String!
        name: String!
    }
`

const resolvers = {
    Query: {
        getAllProducts: () => [{ 
            id: '1', 
            name: 'All products' 
        }]
    },
    Mutation:{
        createProduct: (context, {input}) => {
            const {id, name} = input;
            console.log(id, name);
            return {
                id, 
                name
            }
        }
    }
}

const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers
})

graphqlServer.applyMiddleware({ app });

app.listen(3000, (err) => {
    if (err) {
        console.log('Not possible to listen on port 3000');
    } else {
        console.log('Server running on port 3000');
    }
});