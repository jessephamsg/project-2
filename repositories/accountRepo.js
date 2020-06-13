const db = require('../database/db');

module.exports = {
    async createOne (username) {
        const account = await db.userAccounts.insertOne({name: username});
        const accountName = await account.ops[0].name;
        return accountName;
    }
}