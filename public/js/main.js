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

const logAllSelectedOptions = () => {
    const arr = $('.roster-selection option:selected');
    for(const option of arr) {
        option.id!==''? selectedOptions.push(option.id): selectedOptions
    }
    console.log(selectedOptions)
}

const renderRosterPage = () => {
    selectedOptions.forEach(option => {
        $(`#${option}`).prop('selected', true)
    })
}

$(()=> {
    renderRosterPage()
})

