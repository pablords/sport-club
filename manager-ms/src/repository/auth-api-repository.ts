import { clientRedis } from "@Infra/services/redis/config"
import { IRepositoryDbMethodsBase, IGetTokenResposeDataDTO } from "./interfaces"

export interface IAuthApiRepositoryDbMethods extends IRepositoryDbMethodsBase<any> {
    saveToken(id: string, token: string): Promise<any>;
    getToken(id: string): Promise<any>;
    deleteToken(id: string): Promise<any>;
}

export class AuthApiRepository implements IAuthApiRepositoryDbMethods {
  async saveToken (id: string, token: string) {
    await clientRedis.connect()
    const savedToken = await clientRedis.set(id, token, { EX: 290, NX: true })
    await clientRedis.disconnect()
    return savedToken
  }

  async getToken (id: string) {
    await clientRedis.connect()
    const getExpiresTime = await clientRedis.sendCommand(["TTL", id])
    const getTokenRes = await clientRedis.get(id)
    if (getExpiresTime == -2 || !getExpiresTime) {
      await clientRedis.del(id)
    }
    await clientRedis.disconnect()
    return {
      token: getTokenRes,
      expires: getExpiresTime
    } as IGetTokenResposeDataDTO
  }

  async deleteToken (id: string) {
    await clientRedis.connect()
    await clientRedis.del(id)
    await clientRedis.disconnect()
  }
}
