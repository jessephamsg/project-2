const db = require('../../database/db');
const studentRepo = require('../studentRepo');
const ObjectId = require('mongodb').ObjectId;
const TEST_DATA = 'Jurong East & West';

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});