module.exports = {
    splitDataInToGroups (arr) {
        const splitPositions = [0];
        for(let i = 0; i< arr.length; i++) {
            if(i !== arr.length -1 && (arr[i].date.substr(0,7) !== arr[i+1].date.substr(0,7))) {
                splitPositions.push(i);
            }
        }
        const groupsOfArr = [];
        for(let i = 0; i< splitPositions.length; i++) {
            if(i !== splitPositions.length - 1 && i !== 0) {
                const newArr = arr.slice(splitPositions[i] + 1, splitPositions[i + 1] + 1);
                groupsOfArr.push(newArr)
            } else if (i !== splitPositions.length - 1 && i === 0) {
                const newArr = arr.slice(splitPositions[i], splitPositions[i + 1] + 1);
                groupsOfArr.push(newArr);
            }
        }
        return groupsOfArr
    },
    sumValueInArr (arr) {
        let intialValue = 0;
        let sum = arr.reduce((acc, currentVal) => acc + currentVal.allAttendance, intialValue);
        return sum
    },
    getMonthlyAttendanceByAge (arr) {
        const attendanceDataGroupedByMonth = this.splitDataInToGroups(arr);
        const numberOfWeeksInAMonth = [];
        for (const weeks of attendanceDataGroupedByMonth) {
            numberOfWeeksInAMonth.push(weeks.length);
        }
        const totalMonthlyAttendance = [];
        for(const attendance of attendanceDataGroupedByMonth) {
            const monthlyAttendance = this.sumValueInArr(attendance);
            totalMonthlyAttendance.push(monthlyAttendance);
        }
        const monthlyAvgAttendance = []
        let index = 0;
        for(const attendance of totalMonthlyAttendance) {
            const avgAttendance = attendance/numberOfWeeksInAMonth[index];
            monthlyAvgAttendance.push(avgAttendance);
            index++
        }
        return monthlyAvgAttendance
    }, 
    getMonthlyAttendance (arrOfArrays) {
        const totalAttendance = []
        for (const [index, arr] of arrOfArrays.entries()) {
            if (index === 0) {
                for(const value of arr) {
                    const result = [value];
                    totalAttendance.push(result); 
                }
            } else {
                for(const [index,value] of arr.entries()) {
                    totalAttendance[index].push(value);
                }
            }
        }
        const totalMonthlyAttendance = totalAttendance.map(monthlyAttendance => {
            let initialVal = 0;
            const sum = monthlyAttendance.reduce((acc, initialVal) => acc + initialVal, initialVal);
            return sum
        })
        return totalMonthlyAttendance
    }
}

