import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { errorHandlerMiddleware } from "@/app/middleware/error-handler"

describe("Testes unitarios de middlewares", () => {
  it("Deve chamar a funcao isOperationalError com instancia de APIError e retornar true error operacional", async () => {
    const error = new APIError("UNPROCESSABLE_ENTITY",
      HttpStatusCode.UNPROCESSABLE_ENTITY,
      true,
      businessError.UNPROCESSABLE_ENTITY,
      undefined
    )
    const resError = await errorHandlerMiddleware.isOperationalError(error)
    expect(resError).toBe(true)
  })

  it("Deve chamar a funcao isOperationalError com instancia de APIError e retornar false error operacional", async () => {
    const error = new Error()
    const resError = await errorHandlerMiddleware.isOperationalError(error)
    expect(resError).toBe(false)
  })

  it("Deve chamar a funcao logError com instancia de APIError", async () => {
    const spy = jest.spyOn(errorHandlerMiddleware, "logError")
    const error = new APIError("UNPROCESSABLE_ENTITY",
      HttpStatusCode.UNPROCESSABLE_ENTITY,
      true,
      businessError.UNPROCESSABLE_ENTITY,
      undefined
    )
    const called = await errorHandlerMiddleware.logError(error)
    expect(spy).toHaveBeenCalled()
    expect(called).toBe(undefined)
    spy.mockRestore()
  })

  it("Deve chamar a funcao logErrorMiddleware com instancia de APIError e passar pelo middleware", async () => {
    const spy = jest.spyOn(errorHandlerMiddleware, "logErrorMiddleware")
    const req = { body: {} } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    const error = new APIError("UNPROCESSABLE_ENTITY",
      HttpStatusCode.UNPROCESSABLE_ENTITY,
      true,
      businessError.UNPROCESSABLE_ENTITY,
      undefined
    )
    const called = await errorHandlerMiddleware.logErrorMiddleware(error, req, res, next)
    expect(spy).toHaveBeenCalled()
    expect(called).toBe(undefined)
  })

  it("Deve chamar a funcao logErrorMiddleware com instancia de APIError e ", async () => {
    const spy = jest.spyOn(errorHandlerMiddleware, "returnError")
    const req = { body: {} } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    const error = new APIError("UNPROCESSABLE_ENTITY",
      HttpStatusCode.UNPROCESSABLE_ENTITY,
      true,
      businessError.UNPROCESSABLE_ENTITY,
      undefined
    )
    const called = await errorHandlerMiddleware.returnError(error, req, res, next)
    expect(spy).toHaveBeenCalled()
    expect(called).toBe(undefined)
  })

  it("deve passar pelo middleware e chamar funcao next caso nao seja passado um error", async () => {
    const req = { body: {} } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await errorHandlerMiddleware.logErrorMiddleware(null, req, res, next)
    expect(next).toBeCalledTimes(2)
  })
})
