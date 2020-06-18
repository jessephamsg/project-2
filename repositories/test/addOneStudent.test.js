const db = require('../../database/db');
const studentRepo = require('../studentRepo');
const TEST_DATA = {
    firstName: 'Ng',
    lastName: 'Eric',
    dob: '2020-08-06',
    ageGroup: 'Tots',
    guardianName: 'Tim',
    guardianContact: 'Ng',
    guardianRole:'Father',
    membership: 'member',
}

beforeAll (async()=> {
    await db.connect();
});

afterAll(async()=> {
    await db.disconnect();
})

test('if studentRepo.addOne() returns an object', async()=> {
    const result = await studentRepo.addOne(TEST_DATA);
    await expect(result).toBeInstanceOf(Object);
});

test ('if studentRepo.addOne() adds one document whose firstName is the same as TEST_DATA\'s first name', async() => {
    const result = await studentRepo.addOne(TEST_DATA);
    console.log(result);
    await expect(result.firstName).toBe(TEST_DATA.firstName);
})