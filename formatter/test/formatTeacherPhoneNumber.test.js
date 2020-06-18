const Teacher = require('../Teacher');

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
        contactNumber: TEST_DATA
    }
}

const buildTeacherObject = ({ id, firstName, lastName, dob, ageGroup, contactNumber}) => {
    return new Teacher(id, firstName, lastName, dob, ageGroup, contactNumber);
}

test('if formatPhoneNumber() returns a number fully formatted when test data is 8 digits', () => {
    const number = buildTeacherObject(buildTestObject(TEST_DATA.eightDigits))
    const formattedNumber = number.formatTeacherNumber();
    expect(formattedNumber).toBe(EXPECTED_RESULT.eightDigits);
});

test('if formatPhoneNumber() returns a number fully formatted when test data is 9 digits', () => {
    const number = buildTeacherObject(buildTestObject(TEST_DATA.nineDigits))
    const formattedNumber = number.formatTeacherNumber();
    expect(formattedNumber).toBe(EXPECTED_RESULT.nineDigits);
});

test('if formatPhoneNumber() returns a number fully formatted when test data is 10 digits', () => {
    const number = buildTeacherObject(buildTestObject(TEST_DATA.sixteenDigits))
    const formattedNumber = number.formatTeacherNumber();
    expect(formattedNumber).toBe(EXPECTED_RESULT.sixteenDigits);
});