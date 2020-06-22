const stringParser = require('./helpers/stringParser');
const dataOutputFormatter = require('./helpers/dataOutputFormatter');
const outputFormatter = dataOutputFormatter.formatDataOutput();


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
        const firstName = stringParser.capitalStringFirstLetter(this.firstName, outputFormatter.LETTER_TO_CAPITAL);
        const lastName = stringParser.capitalStringFirstLetter(this.lastName, outputFormatter.LETTER_TO_CAPITAL);
        return firstName + outputFormatter.SPACE_BREAK + lastName
    }
    formatGuardianFullName() {
        const nameArr = this.guardianName.split(outputFormatter.SPACE_BREAK);
        const capitalNameArr = []
        nameArr.forEach(name => capitalNameArr.push(stringParser.capitalStringFirstLetter(name, outputFormatter.LETTER_TO_CAPITAL)));
        return capitalNameArr.join(outputFormatter.SPACE_BREAK);
    }
    formatPhoneNumber() {
        return stringParser.splitNumberString(this.guardianContact, outputFormatter.NUMBER_TO_SPLIT, outputFormatter.DASH_BREAK)
    }
    formatAgeInYears() {
        return (this.age * outputFormatter.YEAR_IN_MILISEC).toFixed(outputFormatter.NUMBER_OF_DP);
    }
}