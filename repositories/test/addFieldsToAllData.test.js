const db = require('../../database/db');
const studentRepo = require('../studentRepo');

beforeAll (async()=> {
    await db.connect();
});

afterAll(async()=> {
    await db.disconnect();
});

test('if studentRepo.addFieldsToAllData returns an array with length greater than 0', async ()=> {
    const result = await studentRepo.addDateFieldsToAllData();
    await expect(result.length).toBeGreaterThan(0)
})

test('if studentRepo.addFieldsToAllData returns an array with objects whose property "dobDateFormat" exist', async ()=> {
    const results = await studentRepo.addDateFieldsToAllData();
    await expect(results[0].dobDateFormat).toBeTruthy()
})