module.exports = {
    type: 'object',
    required: ['firstName', 'ageGroup', 'guardianName', 'guardianContact'],
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
            format: 'date'
        },
        ageGroup: {
            type: 'string',
        },
        guardianName: {
            type: 'string',
            minLength: 2
        },
        guardianContact: {
            type: 'string',
            minLength: 5
        },
        guardianRole: {
            type: 'string'
        },
        guardianMembership: {
            type: 'string',
        },
        firstSeen: {
            type: 'string',
            format: 'date'
        }
    }
}