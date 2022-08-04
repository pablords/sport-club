import axios from "axios"

export const apiKeycloack = axios.create({
  baseURL: process.env.AUTH_API_URL
})
