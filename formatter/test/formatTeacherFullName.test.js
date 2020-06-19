const Teacher = require('../Teacher');

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
        contactNumber: ''
    }
}

const buildTeacherObject = ({ id, firstName, lastName, dob, ageGroup, contactNumber }) => {
    return new Teacher(id, firstName, lastName, dob, ageGroup, contactNumber);
}

test('if formatChildFullName() returns a name fully formatted when test data comes with proper case', () => {
    const teacher = buildTeacherObject(buildTestObject(TEST_DATA.withCase))
    console.log(teacher);
    const formattedTeacher = teacher.formatChildFullName();
    expect(formattedTeacher).toBe(EXPECTED_RESULT);
});

test('if formatChildFullName() returns a name fully formatted when test data comes without case', () => {
    const teacher = buildTeacherObject(buildTestObject(TEST_DATA.withoutCase))
    const formattedTeacher = teacher.formatChildFullName();
    expect(formattedTeacher).toBe(EXPECTED_RESULT);
});

test('if formatChildFullName() returns a name fully formatted when test data comes with inconsistent case', () => {
    const teacher = buildTeacherObject(buildTestObject(TEST_DATA.inconsistentCase))
    const formattedTeacher = teacher.formatChildFullName();
    expect(formattedTeacher).toBe(EXPECTED_RESULT);
});