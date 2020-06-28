const repositories = require('../repositories');

module.exports = {
    async createNewUser(userAccount) {
        const account = await repositories.accountRepo.createOne(userAccount);
        return account
    },
    async editUserProfile(userID, editedObject) {
        const account = await repositories.accountRepo.editOne(userID, editedObject);
        return account
    },
    async searchAccount(username) {
        const account = await repositories.accountRepo.findOneAccount(username);
        return account
    }
}