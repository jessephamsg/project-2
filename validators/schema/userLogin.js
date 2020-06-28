module.exports = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
        username: {
            type: 'string',
            maxLength: 256
        },
        password: {
            type: 'string'
        }
    }
};