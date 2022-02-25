# React-native-phyllo-connect-sdk

### Install using npm

Installing via npm

```sh
npm install react-native-phyllo-connect
```

Installing via yarn

```sh
yarn add react-native-phyllo-connect
```

This will bring all dependencies to your project.

This package uses some dependencies to work, which you can install using

```sh
cd ios && pod install
```

### Using React-native-phyllo-connect-sdk in your project

Import and create an instace

```sh
// import the PhylloConnect to your application
import PhylloConnect from 'react-native-phyllo-connect'

// create an instance of PhylloConnect
const phylloConnect = new PhylloConnect()
```

Subscribing to events

```sh
// Subscribe to an event by passing a callback
const eventWatcher = phylloConnect.addAnEventListener('<event-type>', callbackFunction)

// Unsubscribe with remove
eventWatcher.remove()
```

here event type can be `onExit`, `onAccountConnected`, `onAccountDisconnected`, `onTokenExpired`.

Creating a user and token for a user
[Check this document on creating a user](https://docs.getphyllo.com/docs/api-reference/b3A6MTQwNjEzNzY-create-a-user)
[Check this document on creating a user token](https://docs.getphyllo.com/docs/api-reference/b3A6MTQwNjEzNzc-create-an-sdk-token)
Open the SDK flow

```sh
phylloConnect.initialize({ clientDisplayName: clientName, userId: userId, token: clentToken, platformId: platformId, env: environmenType})
```
