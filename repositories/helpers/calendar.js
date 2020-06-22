const START_DATE = '2020-01-05';
const CLASS_FREQ_IN_MILISEC = 7 * 8.64e+7;
const WEEKS_IN_A_YEAR = 52;
const DAY_IN_MILISEC = 1000 * 3600 * 24;
const DAYS_IN_A_WEEK = 7;


module.exports = {
    createClassTimetable() {
        const parsedDate = Date.parse(START_DATE);
        const timeTable = [parsedDate];
        for (let i = 0; i <= WEEKS_IN_A_YEAR; i++) {
            timeTable.push(timeTable[timeTable.length - 1] + CLASS_FREQ_IN_MILISEC);
        };
        const stringTimeTable = timeTable.map(date => new Date(date).toISOString().slice(0, 10))
        return stringTimeTable;
    },
    convertDatesToDays(dateString) {
        const date = new Date(dateString);
        const startDate = new Date('2020-01-01')
        const numberOfDaysSinceBeginning = date.getTime() - startDate.getTime();
        return numberOfDaysSinceBeginning / DAY_IN_MILISEC
    },
    convertDateToWeek(dateString) {
        return Math.ceil(this.convertDatesToDays(dateString) / DAYS_IN_A_WEEK);
    }
}

