const db = require('../../database/db');
const studentRepo = require('../studentRepo');
const TEST_DATA = 'Jurong East & West';

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

test('if studentRepo.getAllByRegions returns an array', async() => {
    const results = await studentRepo.getAllByRegions(TEST_DATA);
    console.log(results)
    await expect(results.length).toBeGreaterThan(0);
})