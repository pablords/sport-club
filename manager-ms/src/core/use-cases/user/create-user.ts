import { AxiosInstance } from "axios"
import { IRequestCreateUserDataDTO, IUseCase } from "../interfaces"
export class CreateUser implements IUseCase {
    private authApi: AxiosInstance;
    constructor (authApi: AxiosInstance) {
      this.authApi = authApi
    }

    async execute (dataRequest: IRequestCreateUserDataDTO, tokenApi?: string) {
      const { status } = await this.authApi.post(`/admin/realms/${process.env.KEYCLOAK_HELM}/users`, dataRequest, {
        headers: { Authorization: `bearer ${tokenApi}` }
      })
      return status
    }
}
