const db = require('../../database/db');
const teacherRepo = require('../teacherRepo');
const TEST_DATA = [{"date":"2020-01-05","id":"5ef1e227b648473c7646c3fd","timing":"0"},{"date":"2020-01-12","id":"5ef1e227b648473c7646c3fe","timing":"0"},{"date":"2020-01-05","id":"5ef1e227b648473c7646c3fe","timing":"1"},{"date":"2020-01-12","id":"5ef1e227b648473c7646c3fe","timing":"1"},{"date":"2020-01-05","id":"5ef1e249ba62cd3c81e7dc19","timing":"2"},{"date":"2020-01-12","id":"5ef1e227b648473c7646c3fe","timing":"2"}]

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
})

test('if teacherRepo.updateStaffRosters returns an object', async() => {
    const results = await teacherRepo.updateStaffRosters(TEST_DATA);
    expect(results).toBeInstanceOf(Object);
})