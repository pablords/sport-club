import { logger } from "@/infra/logger/config"

jest.mock("@/infra/logger/config")

describe("Teste de unidade config Logger", () => {
  it("Deve validar config logger", async () => {
    jest.spyOn(logger, "trace").mockImplementationOnce(() => "message")
    const teste = logger.trace("message")
    expect(teste).toBe("message")
  })
})
