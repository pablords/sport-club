export interface IUseCase{
    execute(filter?: Object, params?: any): Promise<any>
}

export interface IResponseLoginDTO {
    access_token: string
    expires_in: number
    refresh_expires_in: number
    refresh_token: string
    token_type: string
    session_state: string
    scope: string
}

export interface IRequestLoginDTO{
  client_id?: string
  client_secret?: string
  grant_type?: "password" | "client_credentials" | "refresh_token"
  username?: string
  password?: string
}

export interface IRequestRefreshTokenValidate{
  grant_type: "refresh_token"
  refresh_token: string
}

export interface IRequestCreateUserDataDTO {
    username: string
    password: string
    firstName: string
    lastName: string
    enabled: boolean
    realmRoles: string[]
    credentials: [{ type: "password" | "client_credentials", value: string, temporary: boolean }]
    emailVerified: boolean
    groups: string[]
}
