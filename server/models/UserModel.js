const { connectToDatabase } = require("../config/mongo");


class UserModel {
    static async getCollection() {
        const db = await connectToDatabase();
        return db.collection("users");
    }

    static async createUser(userData) {
        const collection = await this.getCollection();
        return collection.insertOne(userData);
    }

    static async findUserByEmail(email) {
        const collection = await this.getCollection();
        return collection.findOne({ email });
    }
}

module.exports = UserModel;