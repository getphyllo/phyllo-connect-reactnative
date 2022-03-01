import { PhylloEnvironment } from 'phyllo-connect-react-native'
import { CLIENT_ID, CLIENT_SECRET, ENVIRONMENT } from '@env'

console.log(CLIENT_ID, CLIENT_SECRET, ENVIRONMENT)
const config = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  env: ENVIRONMENT,
}

// const USER_NAME = Math.random().toString(36).slice(0, 25)

export default config
