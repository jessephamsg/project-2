const db = require('../../database/db');
const teacherServices = require('../teacherService');
const Teacher = require('../../formatter/Teacher');
const TEST_DATA = 'Tots';
const EXPECTED_RESULT = 'Helen Keller';

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

const buildTeacherObject = ({ id, firstName, lastName, dob, ageGroup, contactNumber }) => {
    return new Teacher(id, firstName, lastName, dob, ageGroup, contactNumber);
}

test('test if getTeachersByAgeGroup() returns a built object whose property\'s value equals to test data', async () => {
    const result = await teacherServices.getTeachersByAgeGroup(TEST_DATA);
    console.log(result);
    expect(result[1].formatChildFullName()).toBe(EXPECTED_RESULT);
})