import { NativeModules, NativeEventEmitter } from 'react-native'

import { PhylloEnvironment } from './PhylloEnvironment'

interface IPhylloInitialize {
  clientDisplayName: string
  token: string
  userId: string
  environment: PhylloEnvironment
  workPlatformId?: string | undefined
}

type TEventType =
  | 'onAccountConnected'
  | 'onAccountDisconnected'
  | 'onExit'
  | 'onTokenExpired'

const phyllo = NativeModules.PhylloConnectModule
const eventEmitter = new NativeEventEmitter(phyllo)

const PhylloConnectSDK = {
  on: (event: TEventType, callback: (body?: any) => {}) => {
    return eventEmitter.addListener(event, callback)
  },
  initialize: ({
    clientDisplayName,
    token,
    userId,
    environment,
    workPlatformId,
  }: IPhylloInitialize) => {
    phyllo.initialize(
      clientDisplayName,
      token,
      userId,
      environment,
      workPlatformId
    )

    // this is to match solely web sdk signature
    return { open: () => phyllo.open() }
  },
}

// export the object
export default PhylloConnectSDK
