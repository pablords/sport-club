
import { authFactory } from "src/bind-factory/auth/authFactory"
import { HttpStatusCode } from "@Exceptions/interfaces"
import businessError from "@Exceptions/business-error"
import { APIError } from "@Exceptions/base-error"

const factory = authFactory()

class SaveTokenDbCache {
  public async execute (access_token: string) {
    const isSavedToken = await factory.saveTokenApi.execute(process.env.CLIENT_ID, access_token)
    if (!isSavedToken) {
      throw new APIError("INTERNAL_SERVER", HttpStatusCode.INTERNAL_SERVER, true, businessError.SAVED_TOKEN)
    }
  }
}
export const saveTokendbCache = new SaveTokenDbCache()
