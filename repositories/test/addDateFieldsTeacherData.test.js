const db = require('../../database/db');
const teacherRepo = require('../teacherRepo');

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
})

test('if teacherRepo.addDateFieldsToAllData returns object', async () => {
    const results = await teacherRepo.addDateFieldsToAllData();
    expect(results).toBeInstanceOf(Object)
})