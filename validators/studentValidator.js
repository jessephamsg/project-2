const Ajv = require('ajv');
const ajv = new Ajv({
    useDefaults: true,
    coerceTypes: true,
    allErrors: true
});
const studentSchema = require('./schema/student');
const validator = ajv.compile(studentSchema);
const ValidationError = require('../formatter/ValidationError');

module.exports = {
    students: {
        validate(data) {
            const isValid = validator(data);
            if (!isValid) {
                const errors = new ValidationError(validator.errors).errorType;
                const errorArr = [];
                console.log(errors);
                errors.forEach(error => errorArr.push(`${error.dataPath} ${error.message}`))
                throw errorArr;
            }
            return isValid
        }
    }
}
