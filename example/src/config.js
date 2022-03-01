import { CLIENT_ID, CLIENT_SECRET, ENVIRONMENT } from '@env'

const getEnvBaseURL = (env) => {
  if (env === 'production') return 'https://api.getphyllo.com'
  if (env === 'sandbox') return 'https://api.sandbox.getphyllo.com'
  else return 'https://api.dev.getphyllo.com'
}

const config = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  env: ENVIRONMENT,
  baseUrl: getEnvBaseURL(ENVIRONMENT),
}

export default config
