let activeTypeTab = ['Tots', 'Junior', 'Lower-Primary', 'Upper-Primary', 'Jurong', 'Clementi', 'Bukit-Panjang', 'CCK-BB'];
let activeSubTypeTab = ['attendance', 'form', 'roster'];


const showStudentDropdown = () => {
    $('.dropdown-container-students').css('display', 'block');
};

const showTeacherDropdown = () => {
    $('.dropdown-container-teachers').css('display', 'block');
};

const showSubTypeDropdown = () => {
    $('.subtab-type').removeClass('active-type-tab');
    const index = event.currentTarget.id;
    $(`#${index}`).addClass('active-type-tab');
    $('.dropdown-container').css('display', 'none');
    const id = event.currentTarget.id.replace('dropdown-', '');
    $(`#dropdown-container-${id}`).css('display', 'block');
};

const formatSubtypeOnClick = () => {
    $('.nav-subtype').removeClass('active-subtype-tab');
    const index = event.currentTarget.id;
    $(`#${index}`).addClass('active-subtype-tab');
}

const formatTypeAndSubTypeTab = () => {
    const pathName = window.location.pathname;
    let currentAgeGroup = '';
    for (const type of activeTypeTab) {
        if (pathName.includes(type)) {
            $(`#dropdown-${type}`).addClass('active-type-tab');
            currentAgeGroup = type;
        }
    }
    for (const type of activeSubTypeTab) {
        if (pathName.includes(type)) {
            $(`#nav-subtype-${currentAgeGroup}`).css('border', 'none');
            $(`#nav-subtype-${type}-${currentAgeGroup}`).css('border', '1px solid #0779E4');
        } else if (type === activeSubTypeTab[0] && pathName.includes(activeSubTypeTab[0])===false) {
            $(`#nav-subtype-${currentAgeGroup}`).css('border', '1px solid #0779E4');
        }
    }
}

const launchChildRegistrationForm = () => {
    $('#child-registration-form').css('display', 'flex');
};

const closeFormModal = () => {
    $('#child-registration-form').css('display', 'none');
};

const sendPageByID = () => {
    const studentID = event.currentTarget.id;
    window.location.replace(`/students/${studentID}`)
}

const sendTeacherPageByID = () => {
    const teacherID = event.currentTarget.id;
    window.location.replace(`/teachers/${teacherID}`)
}

const getRosterData = () => {
    const arr = $('.roster-data');
    const valueArr = []
    for (const option of arr) {
        valueArr.push(option.value)
    }
    return valueArr
}

const sortRosterDataByAscendingDate = () => {
    const valueArr = getRosterData();
    valueArr.sort((a, b) => {
        const aDate = a.substr(0, 12);
        const bDate = b.substr(0, 12);
        return aDate === bDate ? 0 : aDate < bDate ? -1 : 1
    });
    return valueArr;
}

const splitRosterDataIntoSlots = () => {
    const valueArr = sortRosterDataByAscendingDate();
    const splitPositions = [0]
    for (let i = 0; i < valueArr.length; i++) {
        if (i !== valueArr.length - 1 && (valueArr[i].substr(0, 12) !== valueArr[i + 1].substr(0, 12))) {
            splitPositions.push(i);
        } else {
            splitPositions
        }
    }
    const groupsOfArr = [];
    for (let i = 0; i < splitPositions.length; i++) {
        if (i !== splitPositions.length - 1 && i !== 0) {
            const newArr = valueArr.slice(splitPositions[i] + 1, splitPositions[i + 1] + 1);
            groupsOfArr.push(newArr);
        } else if (i !== splitPositions.length - 1 && i === 0) {
            const newArr = valueArr.slice(splitPositions[i], splitPositions[i + 1] + 1);
            groupsOfArr.push(newArr);
        }
    }
    return groupsOfArr
}

const matchRosterData = () => {
    const groupsOfArr = splitRosterDataIntoSlots();
    for (const arr of groupsOfArr) {
        for (const [index, value] of arr.entries()) {
            const selectedOption = $(`option[value="${value}"]`)[index];
            $(selectedOption).prop('selected', true);
        }
    }
}

const formatRosterTable = () => {
    const selectArr = $('.roster-selection');
    for (const select of selectArr) {
        if (select.value.length !== 10) {
            $(select).addClass('select-value')
        } else {
            $(select).addClass('select-value-zero')
        }
    }
}

const formatSelectOnChange = () => {
    if ($(event.currentTarget).hasClass('select-value-zero') && event.currentTarget.value.length !== 10) {
        $(event.currentTarget).addClass('select-value').removeClass('select-value-zero');
    } else if ($(event.currentTarget).hasClass('select-value') && event.currentTarget.value.length !== 10) {
        $(event.currentTarget)
    } else {
        $(event.currentTarget).addClass('select-value-zero').removeClass('select-value');
    }
}

$(() => {
    matchRosterData();
    formatRosterTable();
    formatTypeAndSubTypeTab();
})

