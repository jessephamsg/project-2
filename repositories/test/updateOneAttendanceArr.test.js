const db = require('../../database/db');
const studentRepo = require('../studentRepo');
const ObjectId = require('mongodb').ObjectId;
const TEST_DATA = '5eecd7b721fff7a25fe1832d';
const ORIGINAL_LENGTH = 0;

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

test('if studentRepo.updateOneAttendanceArrayByID returns an object', async()=> {
    const result = await studentRepo.updateOneAttendanceArrayByID(TEST_DATA, '2020-10-20');
    await expect(result).toBeInstanceOf(Object);
})

test('if studentRepo.updateOneAttendanceArrayByID results in that object\'s attendance length increased', async()=> {
    const result = await studentRepo.updateOneAttendanceArrayByID(TEST_DATA, '2020-10-20');
    const foundResult = await studentRepo.getOneByID(TEST_DATA)
    const resultLength = await foundResult.attendance.length
    await expect(resultLength).toBeGreaterThan(ORIGINAL_LENGTH);
})