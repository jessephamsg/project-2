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

const formatRosterTable = () => {
    const selectArr = $('select');
    for (const select of selectArr) {
        if(select.value.length !== 10) {
            $(select).addClass('select-value')
        } else {
            $(select).addClass('select-value-zero')
        }
    }
}

const formatSelectOnChange = () => {
    if($(event.currentTarget).hasClass('select-value-zero') && event.currentTarget.value.length !== 10) {
        $(event.currentTarget).addClass('select-value').removeClass('select-value-zero');
    } else if ($(event.currentTarget).hasClass('select-value') && event.currentTarget.value.length !== 10) {
        $(event.currentTarget)
    } else {
        $(event.currentTarget).addClass('select-value-zero').removeClass('select-value');
    }
}

$(() => {
    matchRosterData();
    formatRosterTable()
})

