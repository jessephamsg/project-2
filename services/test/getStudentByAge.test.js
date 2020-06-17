const db = require('../../database/db');
const studentServices = require('../studentService');
const Student = require('../../formatter/Student');
const TEST_DATA = 'Tots';
const EXPECTED_RESULT = 'Ong Emmanual';

beforeAll (async()=> {
    await db.connect();
});

afterAll(async()=> {
    await db.disconnect();
});

const buildStudentObject = ({ id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, firstSeen, lastSeen }) => {
    return new Student(id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, firstSeen, lastSeen);
}

test('test if getStudentsByAgeGroup() returns a built object whose property\'s value equals to test data', async () => {
    const result = await studentServices.getStudentsByAgeGroup('Tots');
    expect(result[1].formatChildFullName()).toBe(EXPECTED_RESULT);
})