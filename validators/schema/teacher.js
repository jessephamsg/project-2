module.exports = {
    type: 'object',
    required: ['firstName', 'ageGroup', 'dob', 'contactNumber'],
    properties: {
        firstName: {
            type: 'string',
            minLength: 2
        },
        lastName: {
            type: 'string',
        },
        dob: {
            type: 'string',
        },
        ageGroup: {
            type: 'string',
        },
        contactNumber: {
            type: 'string',
            minLength: 5
        },
    }
}