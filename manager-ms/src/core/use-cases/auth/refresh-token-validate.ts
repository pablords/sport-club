
import { IUseCase, IRequestRefreshTokenValidate, IResponseLoginDTO } from "../interfaces"
import qs from "qs"
import { AxiosResponse, AxiosInstance } from "axios"

export class RefreshTokenValidate implements IUseCase {
  private authApi: AxiosInstance
  constructor (authApi: AxiosInstance) {
    this.authApi = authApi
  }

  async execute (dataRequest: IRequestRefreshTokenValidate) {
    const dataFormat = qs.stringify(
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: dataRequest.grant_type,
        refresh_token: dataRequest.refresh_token
      }
    )
    const { data }: AxiosResponse<IResponseLoginDTO> = await this.authApi.post(`/realms/${process.env.KEYCLOAK_HELM}/protocol/openid-connect/token`, dataFormat, {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    })
    return data
  }
}
