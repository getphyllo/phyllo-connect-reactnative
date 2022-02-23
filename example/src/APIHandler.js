import axios from 'axios'
import { decode, encode } from 'base-64'
import config from './config'

const CREATE_USER_TOKEN_ENDPOINT = '/v1/sdk-tokens'
const CREATE_USER_ENDPOINT = '/v1/users'

if (!global.btoa) {
  global.btoa = encode
}

if (!global.atob) {
  global.atob = decode
}

const getAxiosInstance = (baseURL) => {
  const api = axios.create({
    baseURL,
    auth: {
      username: config.clientId,
      password: config.clientSecret,
    },
  })
  return api
}

export const createUser = async (name, externalId, envURL) => {
  try {
    const api = getAxiosInstance(envURL)
    console.log('api instance', api)

    let response = await api.post(CREATE_USER_ENDPOINT, {
      name,
      external_id: externalId,
    })
    console.log('userResponse', response.data)
    return response.data.id
  } catch (err) {
    throw err
  }
}

export const createUserToken = async (userId, envURL) => {
  if (!userId) {
    let err = new Error('User id cannot be blank or null')
    throw err
  }
  try {
    const api = getAxiosInstance(envURL)
    let response = await api.post(CREATE_USER_TOKEN_ENDPOINT, {
      user_id: userId,
      products: ['IDENTITY', 'ENGAGEMENT', 'INCOME'],
    })
    console.log('TokenResponse', response.data)
    return response.data.sdk_token
  } catch (err) {
    throw err
  }
}
