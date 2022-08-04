import { IGetTokenResposeDataDTO } from "@Repository/interfaces"
import { authFactory } from "src/bind-factory/auth/authFactory"

const factory = authFactory()

class GetTokenApi {
  public async execute () {
    const { token, expires }:IGetTokenResposeDataDTO = await factory.getTokenDb.execute(process.env.CLIENT_ID)
    if (!token || !expires || expires == -2) {
      const { access_token } = await factory.login.execute({ grant_type: "client_credentials" })
      return {
        access_token: access_token,
        expires: expires
      }
    }
    return {
      access_token: token,
      expires: expires
    }
  }
}
export const getTokenApi = new GetTokenApi()
