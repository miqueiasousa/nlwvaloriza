export class ApiError extends Error {
  constructor (
    public status: number,
    public message: string
  ) {
    super()
  }
}

export class BadRequest extends ApiError {
  constructor (message = 'Bad Request') {
    super(400, message)
  }
}

export class Unauthorized extends ApiError {
  constructor (message = 'Unauthorized') {
    super(401, message)
  }
}

export class NotFound extends ApiError {
  constructor (message = 'Not Found') {
    super(404, message)
  }
}
