const db = require('../../database/db');
const studentRepo = require('../studentRepo');
const TEST_DATA = 'Tots';

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

test('if studentRepo.getAllByAgeGroup() returns an array with length greater than 0', async () => {
    const result = await studentRepo.getAllByAgeGroup(TEST_DATA);
    await expect(result.length).toBeGreaterThan(0)
});

test('if studentRepo.getAllByAgeGroup() returns an array with an object whose ageGroup property is equal to test data', async () => {
    const result = await studentRepo.getAllByAgeGroup(TEST_DATA);
    await expect(result[0].ageGroup).toBe(TEST_DATA);
});