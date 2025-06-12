require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('@apollo/server-plugin-landing-page-graphql-playground');
const { verifyToken } = require('./utils/jwt');

const UserModel = require('./models/UserModel');

const { typeDefs: userTypeDefs, resolvers: userResolvers } = require('./schemas/UserSchema');
const { typeDefs: postTypeDefs, resolvers: postResolvers } = require('./schemas/PostSchema');
const { typeDefs: followTypeDefs, resolvers: followResolvers } = require('./schemas/FollowSchema');
const { typeDefs: helpTypeDefs, resolvers: helpResolvers } = require('./schemas/HelpSchema');

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs, helpTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers, helpResolvers],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 3000, host: '0.0.0.0' },
  context: async ({ req }) => {
    const authorization = req.headers.authorization;
    if (!authorization) return {};
    const rawToken = authorization.split(' ');
    if (rawToken[0] !== 'Bearer' || !rawToken[1]) throw new Error('Invalid token');
    const payload = verifyToken(rawToken[1]);
    const user = await UserModel.getUserById(payload.id);
    if (!user) throw new Error('Invalid token');
    return { user };
  },
}).then(({ url }) => {
  console.log(`🚀 Server running at ${url}`);
});