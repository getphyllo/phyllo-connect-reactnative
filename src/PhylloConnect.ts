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
  | 'onTokenExpired'
  | 'onAccountConnected'
  | 'onAccountDisconnected'
  | 'onExit'
  | 'getPhylloEnvironmentUrl'

const phyllo = NativeModules.PhyConnectModule

class PhylloConnect {
  eventListeners: Set<EmitterSubscription>
  eventEmitter: NativeEventEmitter

  constructor() {
    this.eventListeners = new Set()
    this.eventEmitter = new NativeEventEmitter(phyllo)

    //   this.addAnEventListener('onExit', this.onExitCallback)
    //   this.addAnEventListener('onTokenExpired', this.onTokenExpiredCallback)
    //   this.addAnEventListener(
    //     'onAccountConnected',
    //     this.onAccountConnectedCallback
    //   )
    //   this.addAnEventListener(
    //     'onAccountDisconnected',
    //     this.onAccountDisconnectedCallback
    //   )
    //   this.addAnEventListener(
    //     'getPhylloEnvironmentUrl',
    //     this.getPhylloEnvironmentUrlCallback
    //   )
    // }

    // onExitCallback = () => {
    //   console.log('exit callback called')
    // }
    // onTokenExpiredCallback = () => {
    //   console.log('token expired')
    // }
    // onAccountConnectedCallback = () => {
    //   console.log('account connected')
    // }
    // onAccountDisconnectedCallback = () => {
    //   console.log('account disconnected')
    // }
    // getPhylloEnvironmentUrlCallback = (obj: {}) => {
    //   console.log(obj)
  }

  addAnEventListener = (event: string, callback: any) => {
    const eventListener = this.eventEmitter.addListener(event, callback)
    this.eventListeners.add(eventListener)
  }

  getPhylloEnv = (env: string) => {
    return phyllo.getPhylloEnvironmentUrl(env, (obj: any) => {
      console.log(obj, 'get phyllo url')
    })
  }

  // phylloDisconnect = () => {
  //   this.eventListeners.forEach((eventLister) => {
  //     eventLister.remove()
  //   })
  //   this.eventListeners.clear()
  // }

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
