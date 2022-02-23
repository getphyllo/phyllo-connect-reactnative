import {
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native'

import { PhylloEnvironment } from './PhylloEnvironment'

interface IPhylloInitialize {
  appName: string
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

const phyllo = NativeModules.PhyConnectModule

class PhylloConnect {
  // eventListeners: Set<EmitterSubscription>
  eventEmitter: NativeEventEmitter

  constructor() {
    // this.eventListeners = new Set()
    this.eventEmitter = new NativeEventEmitter(phyllo)
  }

  addAnEventListener = (event: TEventType, callback: any) => {
    return this.eventEmitter.addListener(event, callback)
  }

  getPhylloEnv = (env: string, callback: () => {}) => {
    phyllo.getPhylloEnvironmentUrl(env, callback)
  }

  initializePhylloConnect = async ({
    appName,
    token,
    userId,
    env,
    platformId = '',
  }: IPhylloInitialize) => {
    try {
      const result = phyllo.initialize(appName, token, userId, env, platformId)
      return result
    } catch (err) {
      throw err
    }
  }
}

// create a new object and export
export default new PhylloConnect()
