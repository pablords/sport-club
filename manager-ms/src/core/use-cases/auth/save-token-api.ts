import { IAuthApiRepositoryDbMethods } from "@Repository/auth-api-repository"
import { IUseCase } from "../interfaces"
export class SaveTokenApi implements IUseCase {
    private authApiRepository: IAuthApiRepositoryDbMethods
    constructor (authApiRepository: IAuthApiRepositoryDbMethods) {
      this.authApiRepository = authApiRepository
    }

    async execute (id: string, token: string) {
      return this.authApiRepository.saveToken(id, token)
    }
}
