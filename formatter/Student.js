const LETTER_TO_CAPITAL = 0;
const SPACE_BREAK = ' ';
const DASH_BREAK = '-'
const NUMBER_TO_SPLIT = 3;

const capitalStringFirstLetter = (string) => {
    return string.charAt(LETTER_TO_CAPITAL).toUpperCase() + string.toLowerCase().slice(1);
}

module.exports = class Student {
    constructor(id, firstName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, firstSeen, attendance) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.ageGroup = ageGroup;
        this.guardianName = guardianName;
        this.guardianContact = guardianContact;
        this.guardianRole = guardianRole;
        this.membership = membership;
        this.firstSeen = firstSeen;
        this.attendance = attendance;
    }
    formatChildFullName() {
        return capitalStringFirstLetter(this.firstName) + SPACE_BREAK + capitalStringFirstLetter(this.lastName);
    }
    formatGuardianFullName() {
        const nameArr = this.guardianName.split(SPACE_BREAK);
        const capitalNameArr = []
        nameArr.forEach(name => capitalNameArr.push(capitalStringFirstLetter(name)));
        return capitalNameArr.join(SPACE_BREAK);
    }
    formatPhoneNumber() {
        const numberArr = this.guardianContact.split('');
        const formattedNumArr = [];
        for (let [index, number] of numberArr.entries()) {
            index % NUMBER_TO_SPLIT === 0 && index !== numberArr.length - 1 ? formattedNumArr.push(number + DASH_BREAK) : formattedNumArr.push(number);
        };
        return formattedNumArr.join('');
    }
}