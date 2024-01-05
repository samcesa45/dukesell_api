export interface ILoginRequestBodyType {
  username: string
  password: string
}

export interface validateLoginRequestBodyType {
  status: boolean
  code: number
  message: 'SUCCESS' | string
  requestBody: ILoginRequestBodyType
}

export interface registerUserRequestBodyType {
  username: string
  firstname: string
  lastname: string
  email: string
  password: string
}

export interface BodyData {
  name: string
  password: string
  email: string
  address?: string
  phoneNumber?: string
}

export interface validateRegisterUserRequestBodyType {
  status: boolean
  code: number
  message: 'SUCCESS' | string
  requestBody: registerUserRequestBodyType
}
