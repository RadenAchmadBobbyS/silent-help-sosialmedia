// index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { verifyToken } = require('./utils/jwt');
const { Server } = require('socket.io');

const cors = require('cors');
const socketHandler = require('./sockets/socketHandler');
const UserModel = require('./models/UserModel');

// GraphQL schemas
const { typeDefs: userTypeDefs, resolvers: userResolvers } = require('./schemas/UserSchema');
const { typeDefs: postTypeDefs, resolvers: postResolvers } = require('./schemas/PostSchema');
const { typeDefs: followTypeDefs, resolvers: followResolvers } = require('./schemas/FollowSchema');
const { typeDefs: helpTypeDefs, resolvers: helpResolvers } = require('./schemas/HelpSchema');

(async () => {
  const app = express();
  const httpServer = http.createServer(app);

  // Setup middleware
  app.use(cors());
  app.use(express.json());

  const apolloServer = new ApolloServer({
    typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs, helpTypeDefs],
    resolvers: [userResolvers, postResolvers, followResolvers, helpResolvers],
    introspection: true,
  });

  await apolloServer.start();

  app.use('/graphql', expressMiddleware(apolloServer, {
    context: async ({ req }) => {
      const auth = req.headers.authorization || '';
      const [bearer, token] = auth.split(' ');
      if (bearer !== 'Bearer' || !token) return { io };
      const payload = verifyToken(token);
      const user = await UserModel.getUserById(payload.id);
      return { user, io };
    },
  }));

  // Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });
  socketHandler(io);
  app.set('io', io);

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 GraphQL: http://localhost:${PORT}/graphql`);
  });
})();
