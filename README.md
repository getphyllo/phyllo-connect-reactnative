<h1 align="center">
  <a href="https://docs.getphyllo.com/">
    Phyllo connect react-native SDK
  </a>
</h1>
<div align="center">

[![npm package](https://img.shields.io/npm/v/phyllo-connect-react-native.svg)](https://www.npmjs.com/package/phyllo-connect-react-native)
<img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Phyllo-connect-react-native is released under the MIT license." />

</div>

## Configuring the SDK

In your react-native project directory:

```sh
npm install phyllo-connect-react-native
```

Then install iOS dependencies using cocoapods:\
[![Version](https://img.shields.io/cocoapods/v/PhylloConnect.svg?style=flat)](http://cocoadocs.org/docsets/PhylloConnect)

```sh
cd ios && pod install
```

## React native implementation

### Importing from phyllo-connect-react-native

```sh
import Phylloconnect from 'phyllo-connect-react-native'
```

### Subscribing to events

```sh
// Subscribe to an event by passing a callback
PhylloConnect.on('<event-type>', callbackFunction)
```

here event type can be `onExit`, `onAccountConnected`, `onAccountDisconnected`, `onTokenExpired`.

Creating a user and token for a user

- [Check this document on creating a user](https://docs.getphyllo.com/docs/api-reference/b3A6MTQwNjEzNzY-create-a-user)
- [Check this document on creating a user token](https://docs.getphyllo.com/docs/api-reference/b3A6MTQwNjEzNzc-create-an-sdk-token)

### Open Phyllo SDK flow

```sh
const config = {
  clientDisplayName,
  token,
  userId,
  environment,
  workPlatformId,
}
PhylloConnect.initialize({ AppName, userId, token, platformId, env})
PhylloConnect.open()
```

| Arguments         | Value                  | Type                                       |
| ----------------- | ---------------------- | ------------------------------------------ |
| clientDisplayName | Client Display Name    | String                                     |
| userId            | User Id                | String                                     |
| token             | User Token             | String                                     |
| workPlatformId    | Your Work Platform Id  | String or Undefined                        |
| environment       | Development Environmen | "development" or "production" or "sandbox" |

### Examples

<b>Try our [sample app](https://github.com/getphyllo/phyllo-connect-reactnative/tree/release-v0.0.1/example)
</b>

Facing any issue? Feel free to raise an issue in the [issues section](<(https://github.com/getphyllo/phyllo-connect-reactnative/issues)>)

## Author

Phyllo, phyl@getphyllo.com

## License

PhylloConnect is available under the MIT license. See the LICENSE file for more information.
