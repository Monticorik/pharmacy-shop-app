import { ApolloServer, gql } from 'apollo-server-micro';
import { MongoClient } from 'mongodb';

let db;

const MONGODB_URI = "mongodb+srv://Moskaliuk:FCxsQwMXXJt6Uct7@pharmacy-shop.ixln3xm.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const typeDefs = gql`
    type Query {
      getProducts(sortObj: SortInput, findObj: FindInput): [Products]
      getCategories: [Categories]
      getProductsForCart(findArr: [String]): [Products]
      getOrders(findArr: [String]): [GetOrder]
    }

    type Mutation {
      sendOrder(bodyObj: BodyInput) : SetOrder
      setFavourite(favouriteObj: FavouriteInput): Products
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
      favourite: Boolean
      amount: Int
    }

    type Categories {
      _id: String
      name: String
    }

    input SortInput {
      name: Int
      price: Int
      favourite: Int
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

    input FavouriteInput {
      _id: String
      favourite: Int
    }
`;

const resolvers = {
    Query: {
      getProducts: async (_, { sortObj, findObj }, { db }) => {
        let sort;
        if(Object.keys(sortObj).length){
          sort = {"favourite": -1, ...sortObj};
        }
        const products = await db.collection("products").find(findObj).sort(sort).toArray();
        return products
      },
      getCategories: async (_, __, { db }) => {
        const categories = await db.collection("categories").find({}).toArray();
        return categories
      },
      getProductsForCart: async (_, { findArr }, { db }) => {
        const query = {'_id': {$in: [...findArr]}};
        const products = await db.collection("products").find(query).toArray();
        return products
      },  
      getOrders: async (_, { findArr }, { db }) => {
        const query = {[`user.${findArr[0]}`]: findArr[1]}
        const orders = await db.collection("orders").find(query).toArray();
        return orders
      }
    },
    Mutation: {
      sendOrder: async (_, { bodyObj }, { db }) => {
        const order = await db.collection("orders").insertOne(bodyObj);
        return  bodyObj;
      },
      setFavourite: async (_, { favouriteObj }, { db }) => {
        const product = await db.collection("products").findOneAndUpdate(
                        { "_id" : favouriteObj._id },
                        { $set: { "favourite" : favouriteObj.favourite } },
                        {returnNewDocument : true}
                      );
        return  product;
      }
    }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  async context() {
    if (!db) {
      try {
        const dbClient = await client.connect();
        db = dbClient.db('sample_pharmacy'); 
      } catch (e) {
        console.error(e);
      }
    }
    return { db };
  },
});

const startServer = server.start();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await startServer;
  await server.createHandler({ path: '/api/graphql' })(req, res);
}