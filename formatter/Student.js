const LETTER_TO_CAPITAL = 0;
const SPACE_BREAK = ' ';
const NUMBER_TO_SPLIT = 3;

const capitalStringFirstLetter = (string) => {
    string.charAt(LETTER_TO_CAPITAL).toUpperCase() + string.slice(1);
}

module.exports = class Student {
    constructor (id, fistName, lastName, dob, ageGroup, guardianName, guardianContact, guardianRole, membership, firstSeen, lastSeen) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.ageGroup = ageGroup;
        this.guardianName = guardianName;
        this.guardianContact =  guardianContact;
        this.guardianRole = guardianRole;
        this.membership = membership;
        this.firstSeen = firstSeen;
        this.lastSeen = lastSeen;
    }
    formatChildFullName () {
        return capitalStringFirstLetter(this.firstName) + SPACE_BREAK + capitalStringFirstLetter(this.lastName);
    }
    formatGuardianFullName () {
        const nameArr = this.guardianName.split(SPACE_BREAK);
        const capitalNameArr = []
        nameArr.forEach(name => capitalNameArr.push(capitalStringFirstLetter(name)));
        return capitalNameArr.join(SPACE_BREAK);
    }
    formatPhoneNumber () {
        const numberArr = this.guardianContact.split('');
        const formattedNumArr = [];
        for(let [index, number] of numberArr.entries()) {
            index%3===0 ? formattedNumArr.push(number + SPACE_BREAK) : formattedNumArr.push(number);
        };
        return formattedNumArr.join('');
    }
}