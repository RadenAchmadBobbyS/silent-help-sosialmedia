const FollowModel = require("../models/FollowModel");


const typeDefs = `#graphql

    type Follow {
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    type User {
        _id: ID
        name: String
        username: String
        email: String
    }

    type Query {
        getFollowers(userId: ID!): [User]
        getFollowing(userId: ID!): [User]
    }

    type Mutation {
        createFollow(followingId: ID, followerId: ID): Follow
        unfollow(followingId: ID, followerId: ID): String
    }

`;

const resolvers = {
    Query: {
        getFollowers: async (_, { userId }, context) => {
            if (!context.user) throw new Error('Unauthorized');
            return await FollowModel.getFollowers(userId);
        },
        getFollowing: async (_, { userId }, context) => {
            if (!context.user) throw new Error('Unauthorized');
            return await FollowModel.getFollowing(userId);
        },
    },

    Mutation: {
        createFollow: async (_, { followingId, followerId }, context) => {
            if (!context.user) throw new Error('Unauthorized');
            // Optional: hanya user terkait yang boleh follow
            if (context.user._id !== followerId) throw new Error('Forbidden');
            const existing = await FollowModel.checkFollow(followingId, followerId);
            if (existing) throw new Error('Already following');

            return await FollowModel.createFollow(followingId, followerId);
        },

        unfollow: async (_, { followingId, followerId }, context) => {
            if (!context.user) throw new Error('Unauthorized');
            if (context.user._id !== followerId) throw new Error('Forbidden');
            const result = await FollowModel.deleteFollow(followingId, followerId);
            if (result.deletedCount === 0) throw new Error('Follow relation not found');

            return 'Unfollowed successfully';
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}