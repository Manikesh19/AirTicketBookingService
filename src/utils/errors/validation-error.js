const { StatusCodes }= require('http-status-codes');

class ValidationError extends Error {
    constructor() {
        super();
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        this.name = 'ValidationError',
        this.explanation = explanation,
        this.message = 'Not able to validate the data sent in the request',
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = ValidationError;