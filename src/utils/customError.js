// utils/CustomError.js

class CustomError extends Error {
    constructor(message, statusCode, code, details = {}) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.code = code;
      this.details = details;
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = CustomError;
  