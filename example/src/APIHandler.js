import axios from 'axios'
import { decode, encode } from 'base-64' // required for axios to work
import config from './config'

const getEnvBaseURL = (env) => {
  if (env === 'production') return 'https://api.getphyllo.com'
  if (env === 'sandbox') return 'https://api.sandbox.getphyllo.com'
  return 'https://api.dev.getphyllo.com'
}

const BASE_URL = getEnvBaseURL(config.env)

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

// create axios base
const getAxiosInstance = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    auth: {
      username: config.clientId,
      password: config.clientSecret,
    },
  })
  return api
}

// creates a user, https://docs.getphyllo.com/docs/api-reference/b3A6MTQwNjEzNzY-create-a-user
export const createUser = async (name, externalId) => {
  try {
    debugger
    const api = getAxiosInstance()
    console.log(`createUser : ${api}`)
    let response = await api.post(CREATE_USER_ENDPOINT, {
      name,
      external_id: externalId,
    })
    console.log(`createUser : ${response}`)
    return response.data.id
  } catch (err) {
    throw err
  }
}

// creates a sdk token, https://docs.getphyllo.com/docs/api-reference/b3A6MTQwNjEzNzc-create-an-sdk-token
export const createUserToken = async (userId) => {
  if (!userId) {
    let err = new Error('User id cannot be blank or null')
    throw err
  }
  try {
    const api = getAxiosInstance()
    console.log(`createUserToken : ${api}`)
    let response = await api.post(CREATE_USER_TOKEN_ENDPOINT, {
      user_id: userId,
      products: ['IDENTITY', 'ENGAGEMENT', 'INCOME'],
    })
    console.log(`createUserToken : ${response}`)
    return response.data.sdk_token
  } catch (err) {
    throw err
  }
}
