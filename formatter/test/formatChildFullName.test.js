const Student = require('../Student');

const TEST_DATA = {
    withCase: {
        firstName: 'Tom',
        lastName: 'Riddle'
    },
    withoutCase: {
        firstName: 'tom',
        lastName: 'riddle'
    },
    inconsistentCase: {
        firstName: 'tOm',
        lastName: 'rIDdlE'
    }
};

const EXPECTED_RESULT = 'Tom Riddle';

const buildTestObject = (TEST_DATA) => {
    return {
        id: '',
        firstName: TEST_DATA.firstName,
        lastName: TEST_DATA.lastName,
        dob: '',
        ageGroup: '',
        guardianName: '',
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

test('if formatChildFullName() returns a name fully formatted when test data comes with proper case', () => {
    const student = buildStudentObject(buildTestObject(TEST_DATA.withCase))
    const formattedStudent = student.formatChildFullName();
    expect(formattedStudent).toBe(EXPECTED_RESULT);
});

test('if formatChildFullName() returns a name fully formatted when test data comes without case', () => {
    const student = buildStudentObject(buildTestObject(TEST_DATA.withoutCase))
    const formattedStudent = student.formatChildFullName();
    expect(formattedStudent).toBe(EXPECTED_RESULT);
});

test('if formatChildFullName() returns a name fully formatted when test data comes with inconsistent case', () => {
    const student = buildStudentObject(buildTestObject(TEST_DATA.inconsistentCase))
    const formattedStudent = student.formatChildFullName();
    expect(formattedStudent).toBe(EXPECTED_RESULT);
});