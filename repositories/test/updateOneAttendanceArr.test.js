const db = require('../../database/db');
const studentRepo = require('../studentRepo');
const ObjectId = require('mongodb').ObjectId;
const TEST_DATA = {
    id: '5eeda8d9598d6b07fb4d199e',
    date:'2020-01-05'
};
const ORIGINAL_LENGTH = 0;

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

test('if studentRepo.updateOneAttendanceArrayByID returns an object', async()=> {
    const result = await studentRepo.updateOneAttendanceArrayByID(TEST_DATA.id, TEST_DATA.date);
    await expect(result).toBeInstanceOf(Object);
})

test('if studentRepo.updateOneAttendanceArrayByID results in that object\'s attendance length is greater than 0', async()=> {
    const result = await studentRepo.updateOneAttendanceArrayByID(TEST_DATA.id, TEST_DATA.date);
    const foundResult = await studentRepo.getOneByID(TEST_DATA.id);
    const resultLength = await foundResult.attendance.length;
    await expect(resultLength).toBeGreaterThan(ORIGINAL_LENGTH);
})

test('if studentRepo.updateOneAttendanceArrayByID results in the attendance\'s isPresent property value to be true', async()=> {
    const result = await studentRepo.updateOneAttendanceArrayByID(TEST_DATA.id, TEST_DATA.date);
    const foundResult = await studentRepo.getOneByID(TEST_DATA.id);
    const resultValue = await foundResult.attendance[0].isPresent;
    await expect(resultValue).toBe(true);
})