const db = require('../database/db');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;
const SALT_ROUND = 10;

module.exports = {
    async createOne(userAccount) {
        userAccount.password = bcrypt.hashSync(userAccount.password, bcrypt.genSaltSync(SALT_ROUND));
        try {
            const account = await db.userAccounts.insertOne(
                {
                    username: userAccount.username,
                    password: userAccount.password,
                    firstName: userAccount.firstName,
                    lastName: userAccount.lastName,
                    school: userAccount.school,
                    email: userAccount.email,
                    phoneNumber: userAccount.phoneNumber,
                    role: userAccount.role
                });
            const accountObject = await account.ops[0];
            return accountObject;
        } catch {
            throw new Error(`Database error: account ${userAccount.username} cannot be created due to ${err.message}`);
        }
    },
    async editOne(userID, editedObj) {
        try {
            const account = await db.userAccounts.updateOne({
                _id: ObjectId(userID)
            }, {
                    $set: {
                        note: editedObj
                    }
                });
            const updatedAccount = await db.userAccounts.find({
                _id: ObjectId(userID)
            }).toArray();
            return updatedAccount[0];
        } catch (err) {
            throw new Error(`Database error: account with ID ${userID} cannot be created due to the following error: ${err.message}`)
        }
    },
    async findOneAccount(logInUsername) {
        try {
            const account = await db.userAccounts.find({
                username: logInUsername,
            }).toArray();
            return account[0];
        } catch (err) {
            throw new Error(`Database error: the following username ${logInUsername} cannot be found due to the following errors: ${err.message}`)
        }
    }
}