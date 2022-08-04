import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { registerRequestValidate } from "@/app/middleware/request-validated/register-request-validate"

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
    await registerRequestValidate.create(req, res, next)
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
        partner: {
          name: null,
          surname: "ruan",
          birthDate: "1990-02-24"
        },
        contacts: [
          {
            email: "pablords@gmail.com",
            phone: 99999999999,
            address: "endereco 6"
          },
          {
            email: "pablojds@yahoo.com",
            phone: 99999999999,
            address: "endereco 7"
          }
        ],
        modalities: [
          {
            id: 4,
            contract: {
              start: "2021-01-01",
              dueDate: "2021-02-01",
              isActive: true,
              status: "ativo"
            }
          },
          {
            id: 5,
            contract: {
              start: "2021-01-01",
              dueDate: "2021-02-01",
              isActive: true,
              status: "ativo"
            }
          }
        ]
      }
    } as any
    await registerRequestValidate.create(req, res, next)
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
        partner: {
          name: "pablo",
          surname: "ruan",
          birthDate: "1990-02-24"
        },
        contacts: [
          {
            email: "pablords@gmail.com",
            phone: 99999999999,
            address: "endereco 6"
          },
          {
            email: "pablojds@yahoo.com",
            phone: 99999999999,
            address: "endereco 7"
          }
        ],
        modalities: [
          {
            id: 4,
            contract: {
              start: "2021-01-01",
              dueDate: "2021-02-01",
              isActive: true,
              status: "ativo"
            }
          },
          {
            id: 5,
            contract: {
              start: "2021-01-01",
              dueDate: "2021-02-01",
              isActive: true,
              status: "ativo"
            }
          }
        ]
      }
    } as any
    await registerRequestValidate.create(req, res, next)
    expect(next).toBeCalled()
  })
})
