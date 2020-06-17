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

const buildStudentObject = ({ id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, firstSeen, lastSeen }) => {
    return new Student(id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, firstSeen, lastSeen);
}

test('if formatChildFullName() returns a name fully formatted when test data comes with proper case', () => {
    const student = buildStudentObject(
        {
            id: '',
            firstName: TEST_DATA.withCase.firstName,
            lastName: TEST_DATA.withCase.lastName,
            dob: '',
            ageGroup: '',
            guardianName: '',
            guardianContact: '',
            guardianRole: '',
            membership: '',
            firstSeen: '',
            lastSeen: ''
        })
    const formattedStudent = student.formatChildFullName();
    expect(formattedStudent).toBe(EXPECTED_RESULT);
});

test('if formatChildFullName() returns a name fully formatted when test data comes without case', () => {
    const student = buildStudentObject(
        {
            id: '',
            firstName: TEST_DATA.withoutCase.firstName,
            lastName: TEST_DATA.withoutCase.lastName,
            dob: '',
            ageGroup: '',
            guardianName: '',
            guardianContact: '',
            guardianRole: '',
            membership: '',
            firstSeen: '',
            lastSeen: ''
        })
    const formattedStudent = student.formatChildFullName();
    expect(formattedStudent).toBe(EXPECTED_RESULT);
});

test('if formatChildFullName() returns a name fully formatted when test data comes with inconsistent case', () => {
    const student = buildStudentObject(
        {
            id: '',
            firstName: TEST_DATA.inconsistentCase.firstName,
            lastName: TEST_DATA.inconsistentCase.lastName,
            dob: '',
            ageGroup: '',
            guardianName: '',
            guardianContact: '',
            guardianRole: '',
            membership: '',
            firstSeen: '',
            lastSeen: ''
        })
    const formattedStudent = student.formatChildFullName();
    expect(formattedStudent).toBe(EXPECTED_RESULT);
});