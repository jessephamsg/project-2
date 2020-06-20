const Student = require('./Student');

const LETTER_TO_CAPITAL = 0;
const SPACE_BREAK = ' ';
const DASH_BREAK = '-'
const NUMBER_TO_SPLIT = 3;

const capitalStringFirstLetter = (string) => {
    return string.charAt(LETTER_TO_CAPITAL).toUpperCase() + string.toLowerCase().slice(1);
}

module.exports = class Teacher extends Student {
    constructor(id, firstName, lastName, dob, ageGroup, contactNumber, address, region) {
        super(id, firstName, lastName, dob, ageGroup)
        this.contactNumber = contactNumber,
        this.address = address,
        this.region = region
    }
    formatTeacherNumber() {
        const numberArr = this.contactNumber.split('');
        const formattedNumArr = [];
        for (let [index, number] of numberArr.entries()) {
            index % NUMBER_TO_SPLIT === 0 && index !== numberArr.length - 1 ? formattedNumArr.push(number + DASH_BREAK) : formattedNumArr.push(number);
        };
        return formattedNumArr.join('');
    }
}