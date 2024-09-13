/**
 * Custom error classes for handling different types of errors.
 * Includes AuthError, ServiceError, and ValidationError.
 */

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthError";
  }
}

class ServiceError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServiceError";
  }
}

class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = "ValidationError";
    this.details = details;
  }
}

export { AuthError, ServiceError, ValidationError };
