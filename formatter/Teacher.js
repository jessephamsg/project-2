const stringParser = require('./helpers/stringParser')
const dataOutputFormatter = require('./helpers/dataOutputFormatter');
const outputFormatter = dataOutputFormatter.formatDataOutput();


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
    formatTeacherFullName() {
        const firstName = stringParser.capitalStringFirstLetter(this.firstName, outputFormatter.LETTER_TO_CAPITAL);
        const lastName = stringParser.capitalStringFirstLetter(this.lastName, outputFormatter.LETTER_TO_CAPITAL);
        return firstName + outputFormatter.SPACE_BREAK + lastName
    }
    formatTeacherNumber() {
        return stringParser.splitNumberString(this.contactNumber, outputFormatter.NUMBER_TO_SPLIT, outputFormatter.DASH_BREAK);
    }
    formatYears() {
        return (this.yearsOfExperience * outputFormatter.YEAR_IN_MILISEC).toFixed(outputFormatter.NUMBER_OF_DP)
    }
}