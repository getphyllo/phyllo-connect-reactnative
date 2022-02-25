import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Button, Alert } from 'react-native'
import PhylloConnect from 'react-native-phyllo-connect'
import AsyncStorage from '@react-native-async-storage/async-storage'

import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { createUser, createUserToken } from './APIHandler'

import config from './config'
import { generateRandomString, generateRandomId } from './randomGenerator'

// create a new instance for PhylloConnect
const phylloConnect = new PhylloConnect()

export default function ExampleApp() {
  const [existingUser, setExistingUser] = useState(false)
  const [envURL, setEnvURL] = useState('')

  useEffect(() => {
    // checks the config.env and calls callback fn for changing env URL
    //phylloConnect.getPhylloEnv(config.env, onChangeURL)
    // adding a event handler for onExit action
    const onExit = phylloConnect.addAnEventListener('onExit', onExitCallBack)
    const onAccountConnected = phylloConnect.addAnEventListener(
      'onAccountConnected',
      onAccountConnectedCallBack
    )
    const onAccountDisconnected = phylloConnect.addAnEventListener(
      'onAccountDisconnected',
      onAccountDisconnectedCallBack
    )
    const onTokenExpired = phylloConnect.addAnEventListener(
      'onTokenExpired',
      onTokenExpiredCallBack
    )
    // remove the event watcher
    return () => {
      onExit.remove()
      onAccountConnected.remove()
      onAccountDisconnected.remove()
      onTokenExpired.remove()
    }
    console.log(phylloConnect.initialize, 'what is initialize')
  }, [])

  // callback function for changing env url on change
  const onChangeURL = (envURL) => {
    setEnvURL(envURL)
  }

  // A callback function called upon event
  const onExitCallBack = (body) => {
    console.log('Exited from phyllo flow')
  }
  const onAccountConnectedCallBack = (body) => {
    console.log('Account got connected')
  }
  const onAccountDisconnectedCallBack = (body) => {
    console.log('Account got disconnected')
  }
  const onTokenExpiredCallBack = (body) => {
    console.log('The token got expired')
  }

  const onPressButton = async (platformId) => {
    const clientDisplayName = generateRandomString()
    const externalId = generateRandomId()

    let userId, token
    try {
      // Create a user, SDK Token if the user is new user
      if (existingUser) {
        userId = await AsyncStorage.getItem('user-id')
        token = await AsyncStorage.getItem('user-token')
        if (!token || !userId) {
          Alert.alert('User does not exist')
          return
        }
      } else {
        userId = await createUser(clientDisplayName, externalId, 'https://api.dev.getphyllo.com')
        token = await createUserToken(userId, 'https://api.dev.getphyllo.com')
        await AsyncStorage.setItem('user-id', userId)
        await AsyncStorage.setItem('user-token', token)
      }

      // opens the sdk flow
      await phylloConnect.initialize({
        clientDisplayName,
        token,
        userId,
        platformId,
        env: 'development',
      })

      const open = phylloConnect.open()
      console.log(open, 'this is phyllo connect open()')
    } catch (e) {
      Alert.alert(e.message)
      console.log(e)
    }
  }
  return (
    <View style={styles.containerStyle}>
      <Button
        onPress={() => onPressButton('')}
        title='Connect Platform Account(s)'
      ></Button>
      <Button
        onPress={() => onPressButton('9bb8913b-ddd9-430b-a66a-d74d846e6c66')}
        title='Connect Instagram using Phyllo'
      ></Button>
      <Button
        onPress={() => onPressButton('14d9ddf5-51c6-415e-bde6-f8ed36ad7054')}
        title='Connect YouTube using Phyllo'
      ></Button>

      <BouncyCheckbox
        fillColor='green'
        onPress={(isChecked) => {
          setExistingUser(isChecked)
        }}
        text='Existing user'
        isChecked={existingUser}
        textStyle={{
          textDecorationLine: 'none',
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flex: 0.5,
    margin: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 150,
  },
})
