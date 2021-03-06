const db = require('../../database/db');
const teacherRepo = require('../teacherRepo');
const TEST_DATA = {
    firstName: 'Helen',
    lastName: 'Keller',
    dob: '1990-08-06',
    ageGroup: 'Tots',
    contactNumber: '80184081',
    address: '',
    region: 'Bukit Panjang',
    role: 'Teacher',
    startDate: '2020-01-09',
}

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
})

test('if teacherRepo.addOne() returns an object', async () => {
    const result = await teacherRepo.addOne(TEST_DATA);
    await expect(result).toBeInstanceOf(Object);
});

test('if teacherRepo.addOne() adds one document whose firstName is the same as TEST_DATA\'s first name', async () => {
    const result = await teacherRepo.addOne(TEST_DATA);
    await expect(result.firstName).toBe(TEST_DATA.firstName);
})