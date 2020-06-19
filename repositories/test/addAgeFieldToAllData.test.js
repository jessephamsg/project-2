const db = require('../../database/db');
const studentRepo = require('../studentRepo');

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

test('if studentRepo.addAgeFieldToAllData returns an array with length greater than 0', async () => {
    const results = await studentRepo.addAgeFieldToAllData();
    await expect(results.length).toBeGreaterThan(0)
})

test('if studentRepo.addAgeFieldToAllData returns an array with objects whose property "age" exist', async () => {
    const results = await studentRepo.addDateFieldsToAllData();
    await expect(results[0].age).toBeTruthy()
})