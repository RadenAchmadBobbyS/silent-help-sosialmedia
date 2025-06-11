require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let database;

async function connectToDatabase() {
    if (!database) {
        await client.connect();
        database = client.db('silent-help');
        console.log('Connected to MongoDB');
    }
    return database;
}

module.exports = { connectToDatabase };