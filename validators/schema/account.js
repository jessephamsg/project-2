module.exports = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
        username: {
            type: 'string',
            maxLength: 256,
            minLength: 2
        },
        password: {
            type: 'string',
            minLength: 2
        }
    }
};