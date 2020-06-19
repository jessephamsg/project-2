module.exports = class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.errorType = message;
    }
}