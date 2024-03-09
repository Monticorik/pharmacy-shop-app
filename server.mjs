import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://Moskaliuk:FCxsQwMXXJt6Uct7@pharmacy-shop.ixln3xm.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const clientPromise = client.connect();

const typeDefs = `#graphql
    type Query {
      getProducts(sortObj: SortInput, findObj: FindInput): [Products]
      getCategories: [Categories]
      getProductsForCart(findArr: [String]): [Products]
      getOrders(findArr: [String]): [GetOrder]
    }

    type Mutation {
      sendOrder(bodyObj: BodyInput) : SetOrder
    }

    type SetOrder {
      _id: String
      user: User
      products: Products
    }

    type Products {
      _id: String
      name: String
      price: Int
      category: String
      amount: Int
    }

    type Categories {
      _id: String
      name: String
    }

    input SortInput {
      name: Int
      price: Int
    }

    input FindInput {
      category: String
    }

    type GetOrder {
      _id: String
      user: User
      products: [Products]
    }

    type User {
      name: String
      email: String
      phone: String
      address: String
    }

    input BodyInput {
      _id: String!
      user: UserInput!
      products: [ProductInput!]!
    }

    input UserInput {
      name: String!
      email: String!
      phone: String!
      address: String!
    }

    input ProductInput {
      _id: String!
      name: String!
      price: Int!
      amount: Int!
    }
`;

const resolvers = {
    Query: {
      getProducts: async (_, { sortObj, findObj }) => {
        const client = await clientPromise;
        const db = client.db('sample_pharmacy');
        const products = await db.collection("products").find(findObj).sort(sortObj).toArray();
        return products
      },
      getCategories: async () => {
        const client = await clientPromise;
        const db = client.db('sample_pharmacy');
        const categories = await db.collection("categories").find({}).toArray();
        return categories
      },
      getProductsForCart: async (_, { findArr }) => {
        const query = {'_id': {$in: [...findArr]}};
        const client = await clientPromise;
        const db = client.db('sample_pharmacy');
        const products = await db.collection("products").find(query).toArray();
        return products
      },  
      getOrders: async (_, { findArr }) => {
        console.log(findArr);
        const property = 'user.' + findArr[0]
        const query = {[property]: findArr[1]}
        console.log(query);
        const client = await clientPromise;
        const db = client.db('sample_pharmacy');
        const orders = await db.collection("orders").find(query).toArray();
        return orders
      }
    },
    Mutation: {
      sendOrder: async (_, { bodyObj }) => {
        const client = await clientPromise;
        const db = client.db('sample_pharmacy');
        const order = await db.collection("orders").insertOne(bodyObj);
        return  bodyObj;
      }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);