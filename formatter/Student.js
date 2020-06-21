const stringParser = require('./helpers/stringParser');
const LETTER_TO_CAPITAL = 0;
const SPACE_BREAK = ' ';
const DASH_BREAK = '-'
const NUMBER_TO_SPLIT = 3;
const YEAR_IN_MILISEC = 3.17098e-11;


module.exports = class Student {
    constructor(id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, address, region, attendance, attendanceSummary, firstSeen, lastSeen, isRegular, teacherIC, age) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.ageGroup = ageGroup;
        this.guardianName = guardianName;
        this.guardianContact = guardianContact;
        this.guardianRole = guardianRole;
        this.membership = membership;
        this.address = address;
        this.region = region;
        this.attendance = attendance;
        this.attendanceSummary = attendanceSummary;
        this.firstSeen = firstSeen;
        this.lastSeen = lastSeen;
        this.isRegular = isRegular;
        this.teacherIC = teacherIC;
        this.age = age
    }
    formatChildFullName() {
        const firstName = stringParser.capitalStringFirstLetter(this.firstName, LETTER_TO_CAPITAL);
        const lastName = stringParser.capitalStringFirstLetter(this.lastName, LETTER_TO_CAPITAL);
        return firstName + SPACE_BREAK + lastName
    }
    formatGuardianFullName() {
        const nameArr = this.guardianName.split(SPACE_BREAK);
        const capitalNameArr = []
        nameArr.forEach(name => capitalNameArr.push(stringParser.capitalStringFirstLetter(name, LETTER_TO_CAPITAL)));
        return capitalNameArr.join(SPACE_BREAK);
    }
    formatPhoneNumber() {
        return stringParser.splitNumberString(this.guardianContact, NUMBER_TO_SPLIT, DASH_BREAK)
    }
    formatAgeInYears() {
        return (this.age * YEAR_IN_MILISEC).toFixed(2);
    }
}