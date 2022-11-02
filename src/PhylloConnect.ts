import { NativeModules, NativeEventEmitter } from 'react-native'
import {
  PHYLLO_ACCOUNT_CONNECTED_KEY,
  PHYLLO_ACCOUNT_DISCONNECTED_KEY,
  PHYLLO_ON_EXIT_KEY,
  PHYLLO_ON_TOKEN_EXPIRED_KEY,
  callBacksDefinitionArr,
} from './constants'
import { PhylloEnvironment } from './PhylloEnvironment'
import { ICallbacks } from './constants'
//import { reactNativeVersionObj } from './constants'
interface IPhylloInitialize {
  clientDisplayName: string
  token: string
  userId: string
  environment: PhylloEnvironment
  workPlatformId?: string
  singleAccount?: Boolean
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
    throw new Error('Please provide Client Display Name')
  }
  if (!params.token) {
    throw new Error('Please provide a Token')
  }
}

const validateCallbacks = (callbacksObj: any) => {
  const keysArr = Object.keys(callbacksObj)
  for (var i = 0; i < keysArr.length; i++) {
    // cheking if callbacks are passed by developer
    if (!callbacksObj[keysArr[i]]) {
      // checking if the missing callback is an optional or mandatory callback and throw error accordingly
      if (
        callBacksDefinitionArr.mandatoryCallbacks.filter(
          (item) => item.callbackName === keysArr[i]
        ).length > 0
      )
        throw new Error('Please add the callback: ' + keysArr[i])
    }

    //checking if the required number of parameters are passed in the callback
    if (callbacksObj[keysArr[i]]) {
      if (
        callbacksObj[keysArr[i]].length <
        [
          ...callBacksDefinitionArr.mandatoryCallbacks,
          ...callBacksDefinitionArr.optionalCallbacks,
        ].filter((key) => key.callbackName === keysArr[i])[0].argsLength
      ) {
        throw new Error(
          'Please add the required number of parameters in callback: ' +
            keysArr[i]
        )
      }
    }
  }
}

// const validateCallbacks = (callbacksObj: any) => {
//   const keysArr = Object.keys(callbacksObj)
//   // ['connect', 'disconnect', 'tokenExpired']
//   for (var i = 0; i < keysArr.length; i++) {
//     // cheking if callbacks are passed by developer
//     if (!callbacksObj[keysArr[i]])
//       throw new Error('Please add the callback: ' + keysArr[i])

//     //checking if the required number of parameters are passed in the callback
//     if (
//       callbacksObj[keysArr[i]].length !==
//       callBacksDefintionArr.filter((key) => key.callbackName === keysArr[i])[0]
//         .argsLength
//     ) {
//       throw new Error(
//         'Please match the required number of parameters in callback: ' +
//           keysArr[i]
//       )
//     }
//   }
// }

const attachCallbacks = (callbackObj: any) => {
  for (let key in callbackObj) {
    const eventName = 'on' + key[0].toUpperCase() + key.slice(1)
    eventEmitter.removeAllListeners(eventName)
  }

  for (let key in callbackObj) {
    const eventName = 'on' + key[0].toUpperCase() + key.slice(1)
    const sysCallback = (body: Array<string>) => {
      callbackObj[key](...body)
    }
    eventEmitter.addListener(eventName, sysCallback)
  }
}
interface ICallBackObj {
  [key: string]: any
}

const callbacksObj: ICallBackObj = {}
const callbacksArray: Array<ICallbacks> = [
  ...callBacksDefinitionArr.mandatoryCallbacks,
  ...callBacksDefinitionArr.optionalCallbacks,
]

callbacksArray.forEach((key) => {
  callbacksObj[key.callbackName] = null
})

const PhylloConnectSDK = {
  // const callbacksObj = [
  //   ...callBacksDefinitionArr.mandatoryCallbacks,
  //   ...callBacksDefinitionArr.optionalCallbacks,
  // ].forEach((key) => {
  //   callbacksObj[key.callbackName] = null
  // })

  // callbacksObj: {
  //   [PHYLLO_ACCOUNT_CONNECTED_KEY.callbackName]: null,
  //   [PHYLLO_ACCOUNT_DISCONNECTED_KEY.callbackName]: null,
  //   [PHYLLO_ON_TOKEN_EXPIRED_KEY.callbackName]: null,
  //   [PHYLLO_ON_EXIT_KEY.callbackName]: null,
  // },
  callbacksObj,
  initialize: function ({
    clientDisplayName,
    token,
    userId,
    environment,
    workPlatformId = '',
    singleAccount = false
  }: IPhylloInitialize) {
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
      workPlatformId,
      singleAccount
    )

    // this is to solely match web sdk signature
    return {
      open: () => {
        validateCallbacks(this.callbacksObj)
        attachCallbacks(this.callbacksObj)
        phyllo.open()
      },
      on: (event: string, callback: any) => {
        this.callbacksObj[event] = callback
      },
      // version: () => {
      //   //return reactNativeVersionObj
      //   return JSON.stringify(reactNativeVersionObj)
      // },
    }
  },
}

// export the object
export default PhylloConnectSDK
