const PostModel = require("../models/PostModel");


const typeDefs = `#graphql

    type Like {
        userId: ID
        username: String
    }

    type Comment {
        userId: ID
        username: String
        content: String
        createdAt: String
    }

    type Post {
        _id: ID
        content: String
        tags: [String]
        imageUrl: String
        authorId: ID
        authorName: String
        comments: [Comment]
        likes: [Like]
        createdAt: String
        updatedAt: String
    }

    input NewPostInput {
        content: String!
        tags: [String]
        imageUrl: String
    }

    input NewCommentInput {
        userId: ID!
        username: String!
        content: String!
    }

    input NewLikeInput {
        userId: ID!
        username: String!
    }

    type Query {
        getAllPosts: [Post]
        getPostById(id: ID!): Post
    }

    type Mutation {
        addPost(input: NewPostInput!): Post
        addComment(postId: ID!, input: NewCommentInput!): String
        likePost(postId: ID!, input: NewLikeInput!): String
        unlikePost(postId: ID!, username: String!): String
    }
`;

const resolvers = {
    Query: {
        getAllPosts: async (_, __, context) => {
            if (!context.user) throw new Error('Unauthorized');
            return await PostModel.getPostsWithDetails();
        },

        getPostById: async (_, { id }, context) => {
            if (!context.user) throw new Error('Unauthorized');
            return await PostModel.findPostById(id);
        }
    },

    Mutation: {
        addPost: async (_, { input }, context) => {
            if (!context.user) throw new Error('Unauthorized');
            const newPost = {
                ...input,
                authorId: context.user._id,
                authorName: context.user.name,
                comments: [],
                likes: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const result = await PostModel.addPost(newPost);
            return { ...newPost, _id: result.insertedId };
        },

        addComment: async (_, { postId, input }, context) => {
            if (!context.user) throw new Error('Unauthorized');
            if (input.userId !== context.user._id) throw new Error('Forbidden');
            const comment = { ...input, createdAt: new Date() };

            await PostModel.addComment(postId, comment);
            return 'Comment added';
        },

        likePost: async (_, { postId, input }, context) => {
            if (!context.user) throw new Error('Unauthorized');
            if (input.userId !== context.user._id) throw new Error('Forbidden');
            await PostModel.likePost(postId, input);
            return 'Post liked';
        },

        unlikePost: async (_, { postId, username }, context) => {
            if (!context.user) throw new Error('Unauthorized');
            // Optional: hanya user terkait yang boleh unlike
            if (context.user.username !== username) throw new Error('Forbidden');
            await PostModel.unlikePost(postId, username);
            return 'Post unliked'
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
};