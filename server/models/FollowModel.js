const { ObjectId } = require("mongodb");
const database = require("../config/mongo");


class FollowModel {
    static async createFollow(followingId, followerId) {
        const newFollow = {
            followingId: new ObjectId(followingId),
            followerId: new ObjectId(followerId),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await database.collection('follows').insertOne(newFollow);
        const insertedFollow = await database.collection('follows').findOne({ _id: result.insertedId });

        return {
            ...insertedFollow,
            followingId: insertedFollow.followingId.toString(),
            followerId: insertedFollow.followerId.toString(),
        };
    }

    static async checkFollow(followingId, followerId) {
        return await database.collection('follows').findOne({
            followingId: new ObjectId(followingId),
            followerId: new ObjectId(followerId)
        });
    }

    static async deleteFollow(followingId, followerId) {
        return await database.collection('follows').deleteOne({
            followingId: new ObjectId(followingId),
            followerId: new ObjectId(followerId),
        });
    }

    static async getFollowers(userId) {
        return await database.collection('follows').aggregate([
            { $match: { followingId: new ObjectId(userId) } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'followerId',
                    foreignField: '_id',
                    as: 'followerUsers',
                },
            },
            { $unwind: '$followerUsers' },
            {
                $project: {
                    _id: '$followerUsers._id',
                    name: '$followerUsers.name',
                    username: '$followerUsers.username',
                    email: '$followerUsers.email',
                },
            },
        ]).toArray();
    }

    static async getFollowing(userId) {
        return await database.collection('follows').aggregate([
            { $match: { followerId: new ObjectId(userId) } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'followingId',
                    foreignField: '_id',
                    as: 'followingUsers',
                },
            },
            { $unwind: '$followingUsers' },
            {
                $project: {
                    _id: '$followingUsers._id',
                    name: '$followingUsers.name',
                    username: '$followingUsers.username',
                    email: '$followingUsers.email',
                },
            },
        ]).toArray();
    }
}

module.exports = FollowModel