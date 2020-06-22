const stringParser = require('./helpers/stringParser')
const Student = require('./Student');

const DASH_BREAK = '-'
const NUMBER_TO_SPLIT = 3;
const LETTER_TO_CAPITAL = 0;
const SPACE_BREAK = ' ';
const YEAR_IN_MILISEC = 3.17098e-11;


module.exports = class Teacher {
    constructor(id, firstName, lastName, dob, ageGroup, contactNumber, address, region, role, startDate, yearsOfExperience, assignedChildren, roster, isAtFullCapacity) {
        this.id = id,
        this.firstName = firstName,
        this.lastName = lastName,
        this.dob = dob,
        this.ageGroup = ageGroup,
        this.contactNumber = contactNumber,
        this.address = address,
        this.region = region,
        this.role = role,
        this.startDate = startDate,
        this.yearsOfExperience = yearsOfExperience,
        this.assignedChildren = assignedChildren,
        this.roster = roster,
        this.isAtFullCapacity = isAtFullCapacity
    }
    formatTeacherFullName () {
        const firstName = stringParser.capitalStringFirstLetter(this.firstName, LETTER_TO_CAPITAL);
        const lastName = stringParser.capitalStringFirstLetter(this.lastName, LETTER_TO_CAPITAL);
        return firstName + SPACE_BREAK + lastName
    }
    formatTeacherNumber() {
        return stringParser.splitNumberString(this.contactNumber, NUMBER_TO_SPLIT, DASH_BREAK)
    }
    formatYears() {
        return (this.yearsOfExperience * YEAR_IN_MILISEC).toFixed(2)
    }
}