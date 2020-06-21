const stringParser = require('./helpers/stringParser')
const Student = require('./Student');

const DASH_BREAK = '-'
const NUMBER_TO_SPLIT = 3;

module.exports = class Teacher extends Student {
    constructor(id, firstName, lastName, dob, ageGroup, contactNumber, address, region) {
        super(id, firstName, lastName, dob, ageGroup)
        this.contactNumber = contactNumber,
        this.address = address,
        this.region = region
    }
    formatTeacherNumber() {
        return stringParser.splitNumberString(this.contactNumber, NUMBER_TO_SPLIT, DASH_BREAK)
    }
}