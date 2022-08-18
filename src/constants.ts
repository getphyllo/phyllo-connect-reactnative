export const PHYLLO_ACCOUNT_CONNECTED_KEY = {
  callbackName: 'accountConnected',
  argsArr: ['accountId', 'workplatformId', 'userId'],
  argsLength: 3,
}

export const PHYLLO_ACCOUNT_DISCONNECTED_KEY = {
  callbackName: 'accountDisconnected',
  argsArr: ['accountId', 'workplatformId', 'userId'],
  argsLength: 3,
}

export const PHYLLO_ON_TOKEN_EXPIRED_KEY = {
  callbackName: 'tokenExpired',
  argsArr: ['userId'],
  argsLength: 1,
}

export const PHYLLO_ON_EXIT_KEY = {
  callbackName: 'exit',
  argsArr: ['reason', 'userId'],
  argsLength: 2,
}


export const PHYLLO_ON_CONNECTION_FAILURE_KEY = {
  callbackName : 'connectionFailure',
  argsArr : ['reason','workplatformId', 'userId'],
  argsLength : 3
}

export const callBacksDefinitionArr = {
  mandatoryCallbacks : new Array(
    PHYLLO_ACCOUNT_CONNECTED_KEY,
    PHYLLO_ACCOUNT_DISCONNECTED_KEY,
    PHYLLO_ON_TOKEN_EXPIRED_KEY,
    PHYLLO_ON_EXIT_KEY
  ),
  optionalCallbacks : new Array(
    PHYLLO_ON_CONNECTION_FAILURE_KEY
  )
}
