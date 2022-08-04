import { HttpStatusCode } from "./interfaces"
export class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;
    public readonly description: string;

    constructor (
      name: string,
      httpCode: HttpStatusCode,
      isOperational: boolean,
      description: string
    ) {
      super()
      Object.setPrototypeOf(this, new.target.prototype)

      this.name = name
      this.httpCode = httpCode
      this.isOperational = isOperational
      this.description = description
      Error.captureStackTrace(this)
    }
}

export class APIError extends BaseError {
  constructor (
    name,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = "internal server error"
  ) {
    super(name, httpCode, isOperational, description)
  }
}
