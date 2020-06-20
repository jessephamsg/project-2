const db = require('../../database/db');
const studentRepo = require('../studentRepo');
const ObjectId = require('mongodb').ObjectId;
const TEST_DATA = '5eeda8d9598d6b07fb4d199e';

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