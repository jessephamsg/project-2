const db = require('../../database/db');
const teacherRepo = require('../teacherRepo');

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
})

test('if teacherRepo.aggregateAllAttendanceSummary returns an object', async() => {
    const results = await teacherRepo.aggregateAllAttendanceSummary();
    expect(results).toBeInstanceOf(Object);
})