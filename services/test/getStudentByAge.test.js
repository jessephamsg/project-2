const db = require('../../database/db');
const studentServices = require('../studentService');
const Student = require('../../formatter/Student');
const TEST_DATA = 'Tots';
const LETTER_TO_CAPITAL = 0;
const SPACE_BREAK = ' '

const capitalStringFirstLetter = (string) => {
    return string.charAt(LETTER_TO_CAPITAL).toUpperCase() + string.toLowerCase().slice(1);
};

const formatChildFullName = (firstName, lastName) => {
    return capitalStringFirstLetter(firstName) + SPACE_BREAK + capitalStringFirstLetter(lastName);
}

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

const buildStudentObject = ({ id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, firstSeen, lastSeen }) => {
    return new Student(id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, firstSeen, lastSeen);
}

test('test if getStudentsByAgeGroup() returns a built object whose property\'s value equals to test data', async () => {
    const result = await studentServices.getStudentsByAgeGroup('Tots');
    const EXPECTED_RESULT = formatChildFullName(result[1].firstName, result[1].lastName)
    expect(result[1].formatChildFullName()).toBe(EXPECTED_RESULT);
})