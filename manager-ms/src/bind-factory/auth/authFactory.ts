import { Login } from "@Core/use-cases/auth/login"
import { CreateUser } from "@Core/use-cases/user/create-user"
import { SaveTokenApi } from "@Core/use-cases/auth/save-token-api"
import { apiKeycloack } from "@Infra/services/keycloakApi"
import { AuthApiRepository } from "@Repository/auth-api-repository"
import { GetTokenDb } from "@Core/use-cases/auth/get-token-db"
import { DeleteTokenDb } from "@Core/use-cases/auth/delete-token-db"
import { RefreshTokenValidate } from "@Core/use-cases/auth/refresh-token-validate"

export function authFactory () {
  const login = new Login(apiKeycloack)
  const createUser = new CreateUser(apiKeycloack)
  const authApiRepository = new AuthApiRepository()
  const saveTokenApi = new SaveTokenApi(authApiRepository)
  const getTokenDb = new GetTokenDb(authApiRepository)
  const deleteTokenDb = new DeleteTokenDb(authApiRepository)
  const refreshTokenValidate = new RefreshTokenValidate(apiKeycloack)
  return {
    login,
    createUser,
    saveTokenApi,
    getTokenDb,
    deleteTokenDb,
    refreshTokenValidate
  }
}
