const Ajv = require('ajv');
const ajv = new Ajv({
    useDefaults: true,
    coerceTypes: true,
    allErrors: true
});
const userLoginSchema = require('./schema/userLogin');
const validator = ajv.compile(userLoginSchema);
const ValidationError = require('../formatter/ValidationError');

module.exports = {
    userLogin: {
        validate(data) {
            const isValid = validator(data);
            if (!isValid) {
                const errors = new ValidationError(validator.errors).errorType;
                const errorArr = [];
                errors.forEach(error => errorArr.push(`${error.dataPath} ${error.message}`))
                throw errorArr;
            }
            return isValid
        }
    }
}
