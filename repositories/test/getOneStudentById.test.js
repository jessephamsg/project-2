const db = require('../../database/db');
const studentRepo = require('../studentRepo');
const ObjectId = require('mongodb').ObjectId;
const TEST_DATA = '5eecd7b721fff7a25fe1832d';

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

test('if studentRepo.getOneByID returns an object', async()=> {
    const result =  await studentRepo.getOneByID(TEST_DATA);
    await expect(result).toBeInstanceOf(Object);
})