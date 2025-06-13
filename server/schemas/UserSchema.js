const FollowModel = require("../models/FollowModel");
const UserModel = require("../models/UserModel");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { signToken } = require("../utils/jwt");


const typeDefs = `#graphql

    type User {
        _id: ID
        name: String
        username: String
        email: String
        password: String
        emergencyPhone: String
        followerUsers: [FollowersUsers]
        followingUsers: [FollowingUsers]
        posts: [Post]
        createdAt: String
        updatedAt: String
    }

    type FollowersUsers {
        _id: ID
        name: String
        username: String
    }

    type FollowingUsers {
        _id: ID
        name: String
        username: String
    }

    type Post {
        _id: ID
        content: String
        authorId: ID
        createdAt: String
    }

    type AuthPayload {
        token: String
        user: User
    }

    type Query {
        getUserById(id: ID!): User
        searchUsers(name: String!): [User]
    }

    type Mutation {
        register(name: String!, username: String!, email: String!, password: String!, emergencyPhone: String!): User
        login(identifier: String!, password: String!): AuthPayload
        followUser(followingId: ID!): String
    }

`;


const resolvers = {

    Query: {
        getUserById: async (_, { id }) => {
            const user = await UserModel.getUserWithFollowersAndFollowing(id);
            if (!user) throw new Error('User not found');

            const posts = await UserModel.getPostByUserId(id);
            return { ...user, posts };
        },

        searchUsers: async (_, { name }) => {
            return await UserModel.searchUserByName(name);
        }
    },

    Mutation: {
        register: async(_, { name, username, email, password, emergencyPhone }) => {
            const existingEmail = await UserModel.getUserByEmail(email);
            if (existingEmail) throw new Error('Email already exists');

            const existingUsername = await UserModel.getUserByUsername(username);
            if (existingUsername) throw new Error('Username already exists');

            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!isEmail.test(email)) throw new Error('Invalid email format');

            if (password.length < 5) throw new Error('Password must be at least 5 characters')

            const hashed = hashPassword(password);
            const newUser = { name, username, email, password: hashed, emergencyPhone };

            await UserModel.register(newUser);
            return newUser;
        },

        login: async(_, { identifier, password }) => {
            if (!identifier) throw new Error('Email/Username is required');
            if (!password) throw new Error('Password is required');

            const user = await UserModel.getUsernameOrEmail(identifier);
            if (!user) throw new Error('Invalid email/username or password');

            const isValid = comparePassword(password, user.password);
            if (!isValid) throw new Error('Invalid email/username or password');

            const token = signToken({ id: user._id });
            return { token, user };
        },

        followUser: async (_, { followingId }, context) => {

            const { user } = await context.auth();
            if (!user) throw new Error('Unauthorized: login first');
        
            const followUser = await UserModel.getUserById(followingId);
            console.log("User (following):", followUser);
        
            if (!user || ! followUser) throw new Error('User not found')

            const existingFollow = await FollowModel.checkFollow(followingId, user._id);

            if (existingFollow) {
                await FollowModel.deleteFollow(followingId, user._id);
                return `User ${user.name} has unfollowed ${followUser.name}`;
            } else {
                await FollowModel.createFollow(followingId, user._id);
                return `User ${user.name} is now following ${followUser.name}`;
            }
        }
    }
}   

module.exports = {
    typeDefs,
    resolvers
}