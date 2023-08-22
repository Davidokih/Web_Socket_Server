
class AppError extends Error {
    constructor (status, message) {
        this.status = status;
        super(message);
    }
}

module.exports = AppError;