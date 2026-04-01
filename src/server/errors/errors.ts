//errors.ts


export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends HttpError { 
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export class UserNotAuthenticatedError extends HttpError { 
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class UserForbiddenError extends HttpError { 
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundError extends HttpError { 
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

export class ConflictError extends HttpError { 
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}