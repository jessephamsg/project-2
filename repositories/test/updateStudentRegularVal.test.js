const db = require('../../database/db');
const studentRepo = require('../studentRepo');

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

test('if studentRepo.updateIsRegularValue returns an obj', async()=> {
    const results = await studentRepo.updateIsRegularValue();
    expect(results).toBeInstanceOf(Object)
})