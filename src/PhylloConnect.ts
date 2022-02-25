import { NativeModules, NativeEventEmitter, Platform } from 'react-native'

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

const phyllo =
  Platform.OS === 'ios'
    ? NativeModules.PhylloConnectModule
    : NativeModules.PhylloConnectModule

console.log(phyllo, "phyllo's value")

export class PhylloConnectSDK {
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
  getPhylloEnv = (env: string, callback: (body?: any) => {}) => {
    console.log(env, callback)
    // phyllo.getPhylloEnvironmentUrl(env, callback)
  }

  initialize = async ({
    appName,
    token,
    userId,
    env,
    platformId = undefined,
  }: IPhylloInitialize) => {
    try {
      const result = phyllo.initialize(appName, token, userId, env, platformId)
      return result
    } catch (err) {
      throw err
    }
  }



}

const PhylloConnect = new PhylloConnectSDK()
// create a new object and export
export default PhylloConnect
