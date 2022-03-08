import { NativeModules, NativeEventEmitter } from 'react-native'

import { PhylloEnvironment } from './PhylloEnvironment'

interface IPhylloInitialize {
  clientDisplayName: string
  token: string
  userId: string
  environment: PhylloEnvironment
  workPlatformId?: string
}

type TEventType =
  | 'accountConnected'
  | 'accountDisconnected'
  | 'exit'
  | 'tokenExpired'

const phyllo = NativeModules.PhylloConnectModule
const eventEmitter = new NativeEventEmitter(phyllo)

const validateConfig = (params: IPhylloInitialize) => {
  if (!params.environment || !(params.environment in PhylloEnvironment)) {
    throw new Error('Please provide a valid environment')
  }
  if (!params.userId) {
    throw new Error('Please provide a User Id')
  }
  if (!params.clientDisplayName) {
    throw new Error('Please Provide Client Display Name')
  }
  if (!params.token) {
    throw new Error('Please provide a Token')
  }
}

const PhylloConnectSDK = {
  on: (event: TEventType, callback: (body?: any) => {}) => {
    // we are adding 'on' at the beginning, capitalize the next work, ex: exit -> onExit
    const eventName = 'on' + event[0].toUpperCase() + event.slice(1)
    return eventEmitter.addListener(eventName, callback)
  },
  initialize: ({
    clientDisplayName,
    token,
    userId,
    environment,
    workPlatformId = '',
  }: IPhylloInitialize) => {
    validateConfig({
      clientDisplayName,
      token,
      userId,
      environment,
    })

    // maintain the same order
    phyllo.initialize(
      clientDisplayName,
      token,
      userId,
      environment,
      workPlatformId
    )

    // this is to solely match web sdk signature
    return { open: () => phyllo.open() }
  },
}

// export the object
export default PhylloConnectSDK
