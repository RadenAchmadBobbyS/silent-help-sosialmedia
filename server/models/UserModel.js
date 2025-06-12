const { ObjectId } = require("mongodb");
const database = require("../config/mongo");
const { connectToDatabase } = require("../config/mongo");


class UserModel {
    static async register(newUser) {
        return await database.collection('users').insertOne(newUser);
    }

    static async getUserById(id) {
        return await database.collection('users').findOne({ _id: new ObjectId(id) });
    }

    static async searchUserByName(name) {
        return await database.collection('users').find({ name: { $regex: name, $options: 'i' } }).toArray();
    }

    static async getUserByEmail(email) {
        return await database.collection('users').findOne({ email });
    }

    static async getUsernameOrEmail(identifier) {
        return await database.collection('users').findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        });
    }

    static async getUserByUsername(username) {
        return await database.collection('users').findOne({ username });
    }

    static async getPostByUserId(userId) {
        return await database.collection('posts').find({ authorId: new ObjectId(userId) }).toArray();
    }

    static async getUserWithFollowersAndFollowing(userId) {
        return await database.collection('users').aggregate([
            { $match: { _id: new ObjectId(userId) } },
            {
                $lookup: {
                    from: 'follows',
                    localField: '_id',
                    foreignField: 'followingId',
                    as: 'followers',
                },
            },
            {
                $lookup: {
                    from: 'follows',
                    localField: '_id',
                    foreignField: 'followerId',
                    as: 'following',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'followers.followerId',
                    foreignField: '_id',
                    as: 'followerUsers',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'following.followingId',
                    foreignField: '_id',
                    as: 'followingUsers',
                },
            },
            {
                $project: {
                    name: 1,
                    username: 1,
                    email: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    followerUsers: { username: 1, name: 1 },
                    followingUsers: { username: 1, name: 1 },
                },
            },
        ]).toArray();
    }
}

module.exports = UserModel;