import { NativeModules, NativeEventEmitter } from 'react-native'
import {
  PHYLLO_ACCOUNT_CONNECTED_KEY,
  PHYLLO_ACCOUNT_DISCONNECTED_KEY,
  PHYLLO_ON_EXIT_KEY,
  PHYLLO_ON_TOKEN_EXPIRED_KEY,
  callBacksDefintionArr,
  callBacksDefinitionArr
} from './constants'
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
    throw new Error('Please provide Client Display Name')
  }
  if (!params.token) {
    throw new Error('Please provide a Token')
  }
}

const validateCallbacks = (callbacksObj: any) => {
  const keysArr = Object.keys(callbacksObj);
  for(var i = 0 ; i < keysArr.length; i++) {
    // cheking if callbacks are passed by developer
    if(!callbacksObj[keysArr[i]]) {
      // checking if the missing callback is an optional or mandatory callback and throw error accordingly
      if(callBacksDefinitionArr.mandatoryCallbacks.filter(item => item.callbackName === keysArr[i]).length > 0) throw new Error("Please add the callback: "+ keysArr[i]);
    }

    //checking if the required number of parameters are passed in the callback
    if(callbacksObj[keysArr[i]]) {
      if(callbacksObj[keysArr[i]].length < [...callBacksDefinitionArr.mandatoryCallbacks,...callBacksDefinitionArr.optionalCallbacks].filter(key => key.callbackName === keysArr[i])[0].argsLength)  {
        throw new Error("Please add the required number of parameters in callback: "+ keysArr[i]);
    }
    }
  }
};

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

const PhylloConnectSDK = {
  callbacksObj: [...callBacksDefinitionArr.mandatoryCallbacks,...callBacksDefinitionArr.optionalCallbacks].forEach(key => {
    callbacksObj[key.callbackName] = null
  }),
  // callbacksObj: {
  //   [PHYLLO_ACCOUNT_CONNECTED_KEY.callbackName]: null,
  //   [PHYLLO_ACCOUNT_DISCONNECTED_KEY.callbackName]: null,
  //   [PHYLLO_ON_TOKEN_EXPIRED_KEY.callbackName]: null,
  //   [PHYLLO_ON_EXIT_KEY.callbackName]: null,
  // },
  initialize: function ({
    clientDisplayName,
    token,
    userId,
    environment,
    workPlatformId = '',
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
      workPlatformId
    )

    // this is to solely match web sdk signature
    return {
      open: () => {
        validateCallbacks(this.callbacksObj)
        attachCallbacks(this.callbacksObj)
        phyllo.open()
      },
      on: (event: TEventType, callback: any) => {
        this.callbacksObj[event] = callback
      },
    }
  },
}


// export the object
export default PhylloConnectSDK
