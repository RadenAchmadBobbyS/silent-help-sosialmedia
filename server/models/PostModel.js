const { ObjectId } = require("mongodb");
const database = require("../config/mongo");


class PostModel {
    static async addPost(newPost) {
        return await database.collection('posts').insertOne(newPost);
    }

    static async findPostById(id) {
        return await database.collection('posts').findOne({ _id: new ObjectId(id) });
    }

    static async addComment(postId, comment) {
        return await database.collection('posts').updateOne(
            { _id: new ObjectId(postId) },
            { $push: { comments: comment }, $set: { updatedAt: new Date() }}
        );
    }

    static async likePost(postId, like) {
        return await database.collection('posts').updateOne(
            { _id: new ObjectId(postId) },
            { $push: { likes: like }, $set: { updatedAt: new Date() }}
        );
    }

    static async unlikePost(postId, username) {
        return await database.collection('posts').updateOne(
            { _id: new ObjectId(postId) },
            { $pull: { likes: { username }}, $set: { updatedAt: new Date() }}
        );
    }

    static async getPostsWithDetails() {
        return await database.collection('posts').aggregate([
            // Urutkan berdasarkan terbaru
            { $sort: { createdAt: -1 } },
            // Join ke users untuk detail pembuat post
            {
                $lookup: {
                    from: 'users',
                    localField: 'authorId',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            { $unwind: '$author' },
            // Unwind comments agar bisa join ke users
            {
                $unwind: {
                    path: '$comments',
                    preserveNullAndEmptyArrays: true
                }
            },
            // Join ke users untuk detail pemberi comment
            {
                $lookup: {
                    from: 'users',
                    localField: 'comments.userId',
                    foreignField: '_id',
                    as: 'comments.user'
                }
            },
            // Gabungkan kembali comments
            {
                $group: {
                    _id: '$_id',
                    post: { $first: '$$ROOT' },
                    comments: { $push: '$comments' }
                }
            },
            // Replace comments array
            {
                $addFields: {
                    'post.comments': '$comments'
                }
            },
            { $replaceRoot: { newRoot: '$post' } },
            // Unwind likes agar bisa join ke users
            {
                $unwind: {
                    path: '$likes',
                    preserveNullAndEmptyArrays: true
                }
            },
            // Join ke users untuk detail pemberi like
            {
                $lookup: {
                    from: 'users',
                    localField: 'likes.userId',
                    foreignField: '_id',
                    as: 'likes.user'
                }
            },
            // Gabungkan kembali likes
            {
                $group: {
                    _id: '$_id',
                    post: { $first: '$$ROOT' },
                    likes: { $push: '$likes' }
                }
            },
            // Replace likes array
            {
                $addFields: {
                    'post.likes': '$likes'
                }
            },
            { $replaceRoot: { newRoot: '$post' } }
        ]).toArray();
    }    
}

module.exports = PostModel;