const selectedOptions = []


const showStudentDropdown = () => {
    $('.dropdown-container-students').css('display', 'block');
};

const showTeacherDropdown = () => {
    $('.dropdown-container-teachers').css('display', 'block');
};

const showSubTypeDropdown = () => {
    $('.dropdown-container').css('display', 'none');
    const id = parseInt(event.currentTarget.id.replace('dropdown-', ''));
    $(`#dropdown-container-${id}`).css('display', 'block');
};

const launchChildRegistrationForm = () => {
    $('#child-registration-form').css('display', 'flex');
};

const closeFormModal = () => {
    $('#child-registration-form').css('display', 'none');
}

const matchRosterData = () => {
    const arr = $('.roster-data')
    const valueArr = []
    for (const option of arr) {
        valueArr.push(option.value)
    }
    valueArr.sort();
    const splitPositions = []
    for (let i = 0; i < valueArr.length; i++) {
        if (i !== valueArr.length - 1 && valueArr[i + 1].substr(0, 12) !== valueArr[i].substr(0, 12)) {
            splitPositions.push(i + 1);
        } else {
            splitPositions
        }
    }
    const groupsOfArr = [];
    splitPositions.forEach(value => { groupsOfArr.push(valueArr.splice(0, value)) })
    for (const arr of groupsOfArr) {
        let index = 0;
        for (const value of arr) {
            const test = $(`option[value="${value}"]`)[index];
            $(test).prop('selected', true);
            index++
        }
    }
}

$(() => {
    matchRosterData()
})

