const Ajv = require('ajv');
const ajv = new Ajv({
    useDefaults: true,
    coerceTypes: true,
    allErrors: true
});
const studentSchema = require('./schema/student');
const validator = ajv.compile(studentSchema);

module.exports = {
    students: {
        validate (data) {
            const isValid = validator(data);
            if(!isValid) {
                throw 'errorrrr';
            } 
            return isValid
        }
    }
}
