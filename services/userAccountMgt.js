const repositories = require('../repositories');

module.exports = {
    async createNewUser (name) {
        const account = await repositories.accountRepo.createOne(name);
        return account
    }
}