const START_DATE = '2020-01-05';
const CLASS_FREQ_IN_MILISEC = 7 * 8.64e+7;
const WEEKS_IN_A_YEAR = 52;

module.exports = {
    createClassTimetable() {
        const parsedDate = Date.parse(START_DATE);
        const timeTable = [parsedDate];
        for (let i = 0; i <= WEEKS_IN_A_YEAR; i++) {
            timeTable.push(timeTable[timeTable.length - 1] + CLASS_FREQ_IN_MILISEC);
        };
        const stringTimeTable = timeTable.map(date => new Date(date).toISOString().slice(0, 10))
        return stringTimeTable;
    }
} 
