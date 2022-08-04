import { NextFunction, Request, Response } from "express"
import { errorHandlerMiddleware } from "@/app/middleware/error-handler"
import axios, { AxiosResponse } from "axios"
import jwt_decode from "jwt-decode"

interface IResponseRefreshTokenValidateDTO{
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
  token_type: string
  "not-before-policy": string
  session_state: string
  scope: string
}

interface IRequestSaveRefreshToken{
  id: string;
  refresh_token: string
}

class GetNewRefreshToken {
  async execute (req: Request, res: Response, next: NextFunction) {
    const token: any = req.headers.authorization || req.headers.token
    try {
      const user: any = jwt_decode(token.split(" ")[1])
      const resDataRefreshToken: AxiosResponse<{ token: string, expires: number }> = await axios.get(`${process.env.MANAGER_URL}/refresh-token/${user.sub}`)
      const dataToken = {
        grant_type: "refresh_token",
        refresh_token: resDataRefreshToken.data.token
      }
      const refreshTokenValidate: AxiosResponse<IResponseRefreshTokenValidateDTO> = await axios.post(`${process.env.MANAGER_URL}/refresh-token`, dataToken)
      if (refreshTokenValidate.data?.access_token) {
        const user: any = jwt_decode(refreshTokenValidate.data.access_token)
        const saveDataToken: IRequestSaveRefreshToken = {
          id: user.sub,
          refresh_token: refreshTokenValidate.data.access_token
        }
        await axios.post(`${process.env.MANAGER_URL}/save-token`, saveDataToken)
        if (req.headers.token) {
          req.headers.token = refreshTokenValidate.data.access_token
          console.log(req.headers.token)
          next("route")
        }
        req.headers.authorization = refreshTokenValidate.data.access_token
        console.log(req.headers.authorization)
        next("route")
      }
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}

export const getNewRefreshToken = new GetNewRefreshToken()
