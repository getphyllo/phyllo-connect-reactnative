// generates a random string of length <= 25, used for creating a user
const generateRandomString = () => {
  const length = 25
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

// generates a random id of length < 10, for extId, used for creating user
const generateRandomId = () => {
  const length = 10
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  )
}

export { generateRandomId, generateRandomString }
