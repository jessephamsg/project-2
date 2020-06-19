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