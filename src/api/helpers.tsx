import instance from './axios-config'

const setToken = (token: string | null): void => {
  if (!token) {
    delete instance.defaults.headers.Authorization
  } else {
    instance.defaults.headers.Authorization = `Bearer ${token}`
  }
}

export default setToken
