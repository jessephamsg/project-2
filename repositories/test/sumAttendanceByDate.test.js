const db = require('../../database/db');
const studentRepo = require('../studentRepo');

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

test('if studentRepo.sumAttendanceByDate returns ', async()=> {
    const results = await studentRepo.sumAttendanceByDateAndAgeGroup('Tots');
    expect(results).toBeInstanceOf(Object);
})