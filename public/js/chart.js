const attendanceDataSet = (dataset) => {
    const attendanceArr = [];
    const arr = $(dataset);
    for(const attendance of arr) {
        attendanceArr.push(attendance.value)
    }
    return attendanceArr;
}


const createAttendanceChart = () => {
    const totsAttendanceArr = attendanceDataSet('.tots-attendance');
    const juniorAttendanceArr = attendanceDataSet('.junior-attendance');
    const upperPrimaryAttendanceArr = attendanceDataSet('.upper-primary-attendance');
    const lowerPrimaryAttendanceArr = attendanceDataSet('.lower-primary-attendance');

    let ctx = $('canvas');
    let attendanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels:  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: 'Tots',
                data: totsAttendanceArr,
                backgroundColor: 'rgba(104, 179, 178, 0.6)',
                borderColor: 'rgba(104, 179, 178, 1)'
            }, {
                label: 'Junior',
                data: juniorAttendanceArr,
                backgroundColor: '#0779e4c2',
                borderColor: '#0779E4'
            }, {
                label: 'Lower Primary',
                data: lowerPrimaryAttendanceArr,
                backgroundColor: 'rgba(240, 242, 203, 0.6)',
                borderColor: '#rgb(240, 242, 203)'
            }, {
                label: 'Upper Primary',
                data: upperPrimaryAttendanceArr,
                backgroundColor: '#e91e63a6',
                borderColor: '#e91e63'
            }]
        }
    })
}

$(()=> {
    createAttendanceChart()
})