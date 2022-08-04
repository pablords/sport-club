import { IAuthApiRepositoryDbMethods } from "@Repository/auth-api-repository"
import { IUseCase } from "../interfaces"

export class DeleteTokenDb implements IUseCase {
    private authApiRepository: IAuthApiRepositoryDbMethods
    constructor (authApiRepository: IAuthApiRepositoryDbMethods) {
      this.authApiRepository = authApiRepository
    }

    async execute (id: string) {
      return this.authApiRepository.deleteToken(id)
    }
}
