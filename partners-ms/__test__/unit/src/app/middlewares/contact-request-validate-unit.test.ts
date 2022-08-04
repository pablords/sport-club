import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { contactRequestValidate } from "@/app/middleware/request-validated/contact-request-validate"
import EntityMock from "../../../../mocks/entities"

describe("Testes de unidade contact-request-validate", () => {
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
    await contactRequestValidate.create(req, res, next)
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
        address: null,
        email: "email@email.com",
        phone: 9999334455,
        partnerId: 2
      }
    } as any
    await contactRequestValidate.create(req, res, next)
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
        address: "endereco 1",
        email: "email@email.com",
        phone: 9999334455,
        partnerId: 2
      }
    } as any
    await contactRequestValidate.create(req, res, next)
    expect(next).toBeCalled()
  })
})
