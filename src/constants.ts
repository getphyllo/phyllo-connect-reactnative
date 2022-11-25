
export interface ICallbacks {
  callbackName: string
  argsArr: Array<string>
  argsLength: number
}


export interface Version {
  reactNativeSdkVersion: string
  minSupportedIosVersion: string
  maxSupportedIosVersion: string
  androidSdkVersion: string
  minSupportedAndroidVersion: string
  maxSupportedAndroidVersion: string
}

export const reactNativeVersionObj: Version = {
  reactNativeSdkVersion: '',
  minSupportedIosVersion: '',
  maxSupportedIosVersion: '',
  androidSdkVersion: '',
  minSupportedAndroidVersion: '',
  maxSupportedAndroidVersion: '',
}

export const PHYLLO_ACCOUNT_CONNECTED_KEY: ICallbacks = {
  callbackName: 'accountConnected',
  argsArr: ['accountId', 'workplatformId', 'userId'],
  argsLength: 3,
}

export const PHYLLO_ACCOUNT_DISCONNECTED_KEY: ICallbacks = {
  callbackName: 'accountDisconnected',
  argsArr: ['accountId', 'workplatformId', 'userId'],
  argsLength: 3,
}

export const PHYLLO_ON_TOKEN_EXPIRED_KEY: ICallbacks = {
  callbackName: 'tokenExpired',
  argsArr: ['userId'],
  argsLength: 1,
}

export const PHYLLO_ON_EXIT_KEY: ICallbacks = {
  callbackName: 'exit',
  argsArr: ['reason', 'userId'],
  argsLength: 2,
}

export const PHYLLO_ON_CONNECTION_FAILURE_KEY: ICallbacks = {
  callbackName: 'connectionFailure',
  argsArr: ['reason', 'workplatformId', 'userId'],
  argsLength: 3,
}

interface ICallbackDefinitions {
  mandatoryCallbacks: Array<ICallbacks>
  optionalCallbacks: Array<ICallbacks>
}

export const callBacksDefinitionArr: ICallbackDefinitions = {
  mandatoryCallbacks: new Array(
    PHYLLO_ACCOUNT_CONNECTED_KEY,
    PHYLLO_ACCOUNT_DISCONNECTED_KEY,
    PHYLLO_ON_TOKEN_EXPIRED_KEY,
    PHYLLO_ON_EXIT_KEY
  ),
  optionalCallbacks: new Array(PHYLLO_ON_CONNECTION_FAILURE_KEY),
}
