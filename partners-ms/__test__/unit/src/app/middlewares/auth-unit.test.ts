import { authMiddleware } from "@/app/middleware/auth-middleware"
import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { errorHandlerMiddleware } from "@/app/middleware/error-handler"
import { uuid } from "uuidv4"

describe("Testes unitários de middleware de autenticacao", () => {
  it("Deve retornar error APIError status 404 caso não seja passado um token", async () => {
    const req = { headers: { authorization: null } } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await authMiddleware.execute(req, res, next)
    expect(res.send).toBeCalledWith(
      new APIError(
        "UNPROCESSABLE_ENTITY",
        HttpStatusCode.UNPROCESSABLE_ENTITY,
        true,
        businessError.UNPROCESSABLE_ENTITY,
        undefined
      )
    )
  })

  it("Deve passar por middleware chamando a funcao next caso seja passado um token em authorization", async () => {
    const req = { headers: { authorization: uuid() } } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await authMiddleware.execute(req, res, next)
    expect(next).toBeCalledTimes(1)
  })

  it("Deve passar por middleware chamando a funcao next caso seja passado um token em token", async () => {
    const req = { headers: { token: uuid() } } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as any
    const next = jest.fn()
    await authMiddleware.execute(req, res, next)
    expect(next).toBeCalledTimes(1)
  })
})
