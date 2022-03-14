<h1 align="center">
  <a href="https://docs.getphyllo.com/">
    Phyllo connect react-native SDK
  </a>
</h1>
<div align="center">

[![npm package](https://img.shields.io/npm/v/react-native-phyllo-connect.svg)](https://www.npmjs.com/package/react-native-phyllo-connect)
<img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="react-native-phyllo-connect is released under the MIT license." />

</div>

## Configuring the SDK

In your React Native project directory:

```sh
npm install react-native-phyllo-connect
```

Then install iOS dependencies using cocoapods:\
[![Version](https://img.shields.io/cocoapods/v/PhylloConnect.svg?style=flat)](http://cocoadocs.org/docsets/PhylloConnect)

```sh
cd ios && pod install
```

## React Native implementation

### Importing from react-native-phyllo-connect

```sh
import PhylloConnect from 'react-native-phyllo-connect'
```

### Creating a user and token

- [Check this document on creating a user](https://docs.getphyllo.com/docs/api-reference/b3A6MTQwNjEzNzY-create-a-user)
- [Check this document on creating a user token](https://docs.getphyllo.com/docs/api-reference/b3A6MTQwNjEzNzc-create-an-sdk-token)

### Create a Phyllo Connect SDK Configuration

```sh
import PhylloConnect, { PhylloEnvironment } from "react-native-phyllo-connect";

const config = {
  clientDisplayName: clientDisplayName,
  environment: PhylloEnvironment.<environmentType>,
  userId: userId,
  token: token,
  workPlatformId: workPlatformId, // (optional)
};

const phylloConnect = PhylloConnect.initialize(config);
```

| Arguments         | Value                  | Type                                                      |
| ----------------- | ---------------------- | --------------------------------------------------------- |
| clientDisplayName | Client Display Name    | String                                                    |
| token             | User Token             | String                                                    |
| userId            | User Id                | String                                                    |
| environment       | Environment            | PhylloEnvironment.sandbox or PhylloEnvironment.production |
| workPlatformId    | Platform Id (optional) | String or Null                                            |

### Subscribing to events

```sh
phylloConnect.on("accountConnected", (account_id, work_platform_id, user_id) => {
  console.log(`onAccountConnected: ${account_id}, ${work_platform_id}, ${user_id}`);
})
phylloConnect.on("accountDisconnected", (account_id, work_platform_id, user_id) => {
  console.log(`onAccountDisconnected: ${account_id}, ${work_platform_id}, ${user_id}`);
})
phylloConnect.on("tokenExpired", (user_id) => {
  console.log(`onTokenExpired: ${user_id}`);
})
phylloConnect.on("exit", (reason, user_id) => {
  console.log(`onExit: ${reason}, ${user_id}`);
})
```

### Open the connection screen

```sh
phylloConnect.open();
```

### Examples

<b>Try our [sample app](https://github.com/getphyllo/phyllo-connect-reactnative/tree/main/example)
</b>

Facing any issue? We have listed solutions for some comman issues [here](https://github.com/getphyllo/phyllo-connect-reactnative/blob/main/Issues.md), If it doesn't help you, feel free to raise an issue in the [issues section](https://github.com/getphyllo/phyllo-connect-reactnative/issues) or report your issue on [#bug-reports](https://discord.com/channels/897097781355888640/949535402845405184) channel of our [Discord server](https://discord.com/channels/897097781355888640/).

## Author

Phyllo, phyl@getphyllo.com

## License

PhylloConnect is available under the MIT license. See the LICENSE file for more information.
