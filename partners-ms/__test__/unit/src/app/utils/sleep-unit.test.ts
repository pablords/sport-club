import { sleep } from "@/app/utils/sleep"

describe("Teste unitario sleep", () => {
  it("deve estar definido", () => {
    expect(sleep(2000)).resolves.toBe({})
  })
})
