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

export const callBacksDefintionArr = new Array(
  PHYLLO_ACCOUNT_CONNECTED_KEY,
  PHYLLO_ACCOUNT_DISCONNECTED_KEY,
  PHYLLO_ON_TOKEN_EXPIRED_KEY,
  PHYLLO_ON_EXIT_KEY
)
