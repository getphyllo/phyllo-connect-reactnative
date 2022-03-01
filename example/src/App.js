import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  Platform,
} from 'react-native'
import PhylloConnect from 'phyllo-connect-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { createUser, createUserToken } from './APIHandler'

import config from './config'
import { generateRandomString } from './randomGenerator'

// create a new instance for PhylloConnect
const phylloConnect = new PhylloConnect()

export default function ExampleApp() {
  const [existingUser, setExistingUser] = useState(false)

  useEffect(() => {
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
  }, [])

  // A callback function called upon event
  const onExitCallBack = (body) => {
    console.log('Exited from phyllo flow')
  }
  const onAccountConnectedCallBack = (body) => {
    console.log('Account has connected')
  }
  const onAccountDisconnectedCallBack = (body) => {
    console.log('Account has disconnected')
  }
  const onTokenExpiredCallBack = (body) => {
    console.log('The token has expired')
  }

  const onPressButton = async (platformId) => {
    const clientDisplayName = 'App name'
    const externalId = generateRandomString(20)

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
        userId = await createUser(generateRandomString(8), externalId)
        token = await createUserToken(userId)
        await AsyncStorage.setItem('user-id', userId)
        await AsyncStorage.setItem('user-token', token)
      }

      // opens the sdk flow
      await phylloConnect.initialize({
        clientDisplayName,
        token,
        userId,
        platformId,
        env: config.env,
      })

      phylloConnect.open()
    } catch (e) {
      Alert.alert(e.message)
      console.log(e)
    }
  }
  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        onPress={() => onPressButton('')}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonText}>Connect Platform Account(s)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressButton('9bb8913b-ddd9-430b-a66a-d74d846e6c66')}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonText}>Connect Instagram using Phyllo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressButton('14d9ddf5-51c6-415e-bde6-f8ed36ad7054')}
        style={styles.buttonStyle}
        underlayColor='#fff'
      >
        <Text style={styles.buttonText}>Connect YouTube using Phyllo</Text>
      </TouchableOpacity>

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
        style={styles.checkboxStyle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginVertical: 5,
    backgroundColor: '#524FA1',
    borderColor: '#524FA1',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerStyle: {
    display: 'flex',
    flex: 0.8,
    marginHorizontal: 35,
    // marginTop: 10,
    // marginVertical
    justifyContent: 'center',
  },
  checkboxStyle: {
    marginTop: 20,
  },
})
