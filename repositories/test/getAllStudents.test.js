const db = require('../../database/db');
const studentRepo = require('../studentRepo');

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

test('if the array returned has length larger or equal to 0', async () => {
    const results = await studentRepo.getAll();
    await expect(results.length).toBeGreaterThan(0);
})