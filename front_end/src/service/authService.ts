import type { User } from "../types/User"
import apiClient, { BASE_URL } from "./apiClient"

const AUTH_URL = `${BASE_URL}/auth`



export interface SignUpResponse{
    name:string
    coverImg : string
    email : string
    _id : string
}


export interface LoginResponse {
    first_name:string
    last_name:string
    img : string
    AccessToken:string
    email : string
    mobile:string
    id : string
}

export interface LogoutResponse{
    message:string
}


export const signup =  async (userData :User):Promise<SignUpResponse> => {
  const response = await apiClient.post(`${AUTH_URL}/signup`,userData)
  return response.data
}


export const login = async (loginData: { email: string; password: string }): Promise<LoginResponse> => {
    const response = await apiClient.post(`${AUTH_URL}/login`,loginData)
    console.log("Backend Response: ", response.data)
    return response.data
}

export const logout =  async () : Promise<LoginResponse> => {
    const response = await apiClient.post(`${AUTH_URL}/logout`)
    return response.data
}