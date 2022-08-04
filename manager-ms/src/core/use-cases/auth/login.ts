
import qs from "qs"
import { AxiosResponse, AxiosInstance } from "axios"
import { IRequestLoginDTO, IResponseLoginDTO, IUseCase } from "../interfaces"
export class Login implements IUseCase {
  private authApi: AxiosInstance
  constructor (authApi: AxiosInstance) {
    this.authApi = authApi
  }

  async execute (dataRequest: IRequestLoginDTO) {
    const dataFormat = qs.stringify(
      {
        client_id: dataRequest.client_id || process.env.CLIENT_ID,
        client_secret: dataRequest.client_secret || process.env.CLIENT_SECRET,
        grant_type: dataRequest.grant_type,
        username: dataRequest.username || null,
        password: dataRequest.password || null
      }
    )
    const { data }: AxiosResponse<IResponseLoginDTO> = await this.authApi.post(`/realms/${process.env.KEYCLOAK_HELM}/protocol/openid-connect/token`, dataFormat, {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    })
    return data
  }
}
