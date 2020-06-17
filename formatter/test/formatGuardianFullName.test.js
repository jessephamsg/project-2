const Student = require('../Student');

const TEST_DATA = {
    withCase: 'Tom Riddle',
    withoutCase: 'tom riddle',
    inconsistentCase: 'tOm rIDdlE'
};

const EXPECTED_RESULT = 'Tom Riddle';

const buildTestObject = (TEST_DATA) => {
    return {
        id: '',
        firstName: '',
        lastName: '',
        dob: '',
        ageGroup: '',
        guardianName: TEST_DATA,
        guardianContact: '',
        guardianRole: '',
        membership: '',
        firstSeen: '',
        lastSeen: ''
    }
}

const buildStudentObject = ({ id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, firstSeen, lastSeen }) => {
    return new Student(id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, firstSeen, lastSeen);
}

test('if formatGuardianFullName() returns a name fully formatted when test data comes with proper case', () => {
    const guardian = buildStudentObject(buildTestObject(TEST_DATA.withCase))
    const formattedGuardian = guardian.formatGuardianFullName();
    expect(formattedGuardian).toBe(EXPECTED_RESULT);
});

test('if formatGuardianFullName() returns a name fully formatted when test data comes without case', () => {
    const guardian = buildStudentObject(buildTestObject(TEST_DATA.withoutCase))
    const formattedGuardian = guardian.formatGuardianFullName();
    expect(formattedGuardian).toBe(EXPECTED_RESULT);
});

test('if formatGuardianFullName() returns a name fully formatted when test data comes with inconsistent case', () => {
    const guardian = buildStudentObject(buildTestObject(TEST_DATA.inconsistentCase))
    const formattedGuardian = guardian.formatGuardianFullName();
    expect(formattedGuardian).toBe(EXPECTED_RESULT);
});