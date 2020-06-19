const MongoClient = require('mongodb').MongoClient;
const MONGO_URI = 'mongodb://localhost:27017'
const DB_NAME = 'crm-project';

const client = new MongoClient(MONGO_URI, {
    useUnifiedTopology: true
});

module.exports = {
    async connect() {
        const connection = await client.connect();
        console.log('connected to Mongo');
        const db = await connection.db(DB_NAME);
        this.userAccounts = db.collection('userAccounts');
        this.studentRecords = db.collection('studentRecords');
        this.teacherRecords = db.collection('teacherRecords');
    },
    disconnect() {
        client.close();
    }
}