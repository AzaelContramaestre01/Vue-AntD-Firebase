export enum LogginOptions {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER'
}

export interface FormState {
  email: string
  password: string
}

export interface Videos {
  id: string
  title: string
  thumbnailMedium: string
  thumbnailHigh: string
  duration: string
  description: string
}