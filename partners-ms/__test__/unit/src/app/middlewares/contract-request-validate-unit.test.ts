import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { contractRequestValidate } from "@/app/middleware/request-validated/contract-request-validate"

describe("Testes de unidade contract-request-validate", () => {
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
    await contractRequestValidate.create(req, res, next)
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
        start: "",
        dueDate: new Date("2021-03-01"),
        isActive: true,
        status: "ativo",
        partnerId: 1,
        modalityId: 2
      }
    } as any
    await contractRequestValidate.create(req, res, next)
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
        start: new Date("2021-02-01"),
        dueDate: new Date("2021-03-01"),
        isActive: true,
        status: "ativo",
        partnerId: 1,
        modalityId: 2
      }
    } as any
    await contractRequestValidate.create(req, res, next)
    expect(next).toBeCalled()
  })
})
