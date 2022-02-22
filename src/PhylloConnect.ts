import {
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native'

interface IPhylloInitialize {
  appName: string
  token: string
  userId: string
  env: string
  platformId?: string | undefined
}

type TEventType =
  | 'onAccountConnected'
  | 'onAccountConnected'
  | 'onAccountDisconnected'
  | 'onTokenExpired'
  | 'onExit'

const phyllo = NativeModules.PhyConnectModule

class PhylloConnect {
  eventListeners: Set<EmitterSubscription>
  eventEmitter: NativeEventEmitter

  constructor() {
    this.eventListeners = new Set()
    this.eventEmitter = new NativeEventEmitter(phyllo)
  }

  addAnEventListener = (event: TEventType, callback: () => {}) => {
    console.log('addAnEventListener the phyllo connect')
    const eventListener = this.eventEmitter.addListener(event, callback)
    this.eventListeners.add(eventListener)
  }

  phylloDisconnect = () => {
    this.eventListeners.forEach((eventLister) => {
      eventLister.remove()
    })
    this.eventListeners.clear()
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
