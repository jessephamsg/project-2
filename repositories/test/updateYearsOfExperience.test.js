const db = require('../../database/db');
const teacherRepo = require('../teacherRepo');

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
})

test('if teacherRepo.updateYearsOfExperience returns an object', async() => {
    const results = await teacherRepo.updateYearsOfExperience();
    expect(results).toBeInstanceOf(Object);
})