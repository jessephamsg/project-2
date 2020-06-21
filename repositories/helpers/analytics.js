const calendarHelper = require('./calendar');

module.exports = {
    calculateAttendanceFreq (firstSeenWeek, attendingFreq) {
        const currentDateString = new Date().toISOString().slice(0, 10);
        const currentWeek = calendarHelper.convertDateToWeek(currentDateString);
        let frequency = 0
        if(isNaN(firstSeenWeek)===false) {
            frequency = (attendingFreq/(currentWeek - firstSeenWeek)).toFixed(2);
            return frequency
        } else {
            return frequency
        }
    }
}


