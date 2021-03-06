const db = require('../../database/db');
const studentRepo = require('../studentRepo');

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

test('if studentRepo.updateFirstSeenValue returns updated firstSeen value', async()=> {
    const results = await studentRepo.updateFirstSeenDateValue();
    expect(results).toBeInstanceOf(Object);
})