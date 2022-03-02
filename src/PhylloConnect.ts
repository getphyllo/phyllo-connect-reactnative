import { NativeModules, NativeEventEmitter } from 'react-native'

import { PhylloEnvironment } from './PhylloEnvironment'

interface IPhylloInitialize {
  clientDisplayName: string
  token: string
  userId: string
  env: PhylloEnvironment
  platformId?: string | undefined
}

type TEventType =
  | 'onAccountConnected'
  | 'onAccountDisconnected'
  | 'onExit'
  | 'onTokenExpired'

const phyllo = NativeModules.PhylloConnectModule

class PhylloConnectSDK {
  // eventListeners: Set<EmitterSubscription>
  eventEmitter: NativeEventEmitter
  constructor() {
    // this.eventListeners = new Set()
    this.eventEmitter = new NativeEventEmitter(phyllo)
  }
  addAnEventListener = (event: TEventType, callback: (body?: any) => {}) => {
    // return the event, let the user handle it
    return this.eventEmitter.addListener(event, callback)
  }

  open = () => {
    phyllo.open()
  }

  initialize = async ({
    clientDisplayName,
    token,
    userId,
    env,
    platformId = undefined,
  }: IPhylloInitialize) => {
    try {
      const result = await phyllo.initialize(
        clientDisplayName,
        token,
        userId,
        env,
        platformId
      )
      return result
    } catch (err) {
      throw err
    }
  }
}

// const PhylloConnect = new PhylloConnectSDK()
// create a new object and export
export default PhylloConnectSDK
