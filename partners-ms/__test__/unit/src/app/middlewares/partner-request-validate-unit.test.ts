import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { partnerRequestValidate } from "@/app/middleware/request-validated/partner-request-validate"

describe("Testes de unidade partner-request-validate", () => {
  let res, next
  beforeEach(() => {
    res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
    next = jest.fn()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  it("Deve retornar statusCode 422 + error caso nao seja passado um payload", async () => {
    const req = { body: {} } as any
    await partnerRequestValidate.create(req, res, next)
    expect(res.status).toBeCalledWith(422)
    expect(res.send).toBeCalledWith(
      new APIError("UNPROCESSABLE_ENTITY",
        HttpStatusCode.UNPROCESSABLE_ENTITY,
        true,
        businessError.UNPROCESSABLE_ENTITY,
        undefined
      )
    )
  })

  it("Deve retornar statusCode 422 + error caso nao seja passado um dado obrigátorio", async () => {
    const req = {
      body: {
        name: "joao",
        surname: "da silva",
        birthDate: 10
      }
    } as any
    await partnerRequestValidate.create(req, res, next)
    expect(res.status).toBeCalledWith(422)
    expect(res.send).toBeCalledWith(
      new APIError("UNPROCESSABLE_ENTITY",
        HttpStatusCode.UNPROCESSABLE_ENTITY,
        true,
        businessError.UNPROCESSABLE_ENTITY,
        undefined
      )
    )
  })

  it("Deve passar pelo middleware caso os passados sejam validados", async () => {
    const req = {
      body: {
        name: "joao",
        surname: "da silva",
        birthDate: new Date("1990-02-24"),
        createdAt: new Date()
      }
    } as any
    await partnerRequestValidate.create(req, res, next)
    expect(next).toBeCalled()
  })
})
