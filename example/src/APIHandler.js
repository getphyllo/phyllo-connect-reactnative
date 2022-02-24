import axios from 'axios'
import { decode, encode } from 'base-64' // required for axios to work
import config from './config'

// endpoints
const CREATE_USER_TOKEN_ENDPOINT = '/v1/sdk-tokens'
const CREATE_USER_ENDPOINT = '/v1/users'

// React-Native doesn't have a atob(decoding) and btoa(encoding) in its global object.
// Which is used by axios to create a http request
// So we added them on the global object
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

// creates a user, https://docs.getphyllo.com/docs/api-reference/b3A6MTQwNjEzNzY-create-a-user
export const createUser = async (name, externalId, envURL) => {
  try {
    const api = getAxiosInstance(envURL)
    console.log('api instance', api)

    let response = await api.post(CREATE_USER_ENDPOINT, {
      name,
      external_id: externalId,
    })

    return response.data.id
  } catch (err) {
    throw err
  }
}

// creates a sdk token, https://docs.getphyllo.com/docs/api-reference/b3A6MTQwNjEzNzc-create-an-sdk-token
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
