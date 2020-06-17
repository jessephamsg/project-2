const Student = require('../Student');

const TEST_DATA = {
    eightDigits: '12345678',
    nineDigits: '123456789',
    sixteenDigits: '1234567812345678',
};

const EXPECTED_RESULT = {
    eightDigits: '1-234-567-8',
    nineDigits: '1-234-567-89',
    sixteenDigits: '1-234-567-812-345-678',
}

const buildTestObject = (TEST_DATA) => {
    return {
        id: '',
        firstName: '',
        lastName: '',
        dob: '',
        ageGroup: '',
        guardianName: '',
        guardianContact: TEST_DATA,
        guardianRole: '',
        membership: '',
        firstSeen: '',
        lastSeen: ''
    }
}

const buildStudentObject = ({ id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, firstSeen, lastSeen }) => {
    return new Student(id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, firstSeen, lastSeen);
}

test('if formatPhoneNumber() returns a number fully formatted when test data is 8 digits', () => {
    const number = buildStudentObject(buildTestObject(TEST_DATA.eightDigits))
    const formattedNumber = number.formatPhoneNumber();
    expect(formattedNumber).toBe(EXPECTED_RESULT.eightDigits);
});

test('if formatPhoneNumber() returns a number fully formatted when test data is 9 digits', () => {
    const number = buildStudentObject(buildTestObject(TEST_DATA.nineDigits))
    const formattedNumber = number.formatPhoneNumber();
    expect(formattedNumber).toBe(EXPECTED_RESULT.nineDigits);
});

test('if formatPhoneNumber() returns a number fully formatted when test data is 10 digits', () => {
    const number = buildStudentObject(buildTestObject(TEST_DATA.sixteenDigits))
    const formattedNumber = number.formatPhoneNumber();
    expect(formattedNumber).toBe(EXPECTED_RESULT.sixteenDigits);
});