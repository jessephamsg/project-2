const db = require('../database/db');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;
const SALT_ROUND = 10;

module.exports = {
    async createOne(userAccount) {
        userAccount.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(SALT_ROUND));
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
    },
    async editOne(userID, editedObj) {
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
    },
    async findOneAccount(logInUsername, logInPassword) {
        const account = await db.userAccounts.find({
            $and: [
                { username: logInUsername },
                { password: logInPassword }
            ]
        }).toArray();
        return account[0];
    }
}