import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Button, Text, Alert } from 'react-native'
import PhylloConnect, { PhylloEnvironment } from 'react-native-phyllo-connect'
import AsyncStorage from '@react-native-async-storage/async-storage'

import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { createUser, createUserToken } from './APIHandler'

import config from './config'
import { generateRandomString, generateRandomId } from './randomGenerator'

export default function TesterApp() {
  const [existingUser, setExistingUser] = useState(false)
  const [envURL, setEnvURL] = useState('')

  useEffect(() => {
    const onExitWatcher = PhylloConnect.addAnEventListener(
      'onExit',
      onExitCallBack
    )

    PhylloConnect.getPhylloEnv(config.env, onChangeURL)

    return () => {
      onExitWatcher.remove()
    }
  }, [])

  const onChangeURL = (envURL) => {
    setEnvURL(envURL)
  }

  const onExitCallBack = (body) => {
    console.log('exited from the phyllo connect')
  }

  const onPressButton = async (platformId) => {
    const clientDisplayName = generateRandomString()
    const externalId = generateRandomId()

    let userId, token
    try {
      if (existingUser) {
        userId = await AsyncStorage.getItem('user-id')
        token = await AsyncStorage.getItem('user-token')
        if (!token || !userId) {
          Alert.alert('User does not exist')
          return
        }
      } else {
        userId = await createUser(clientDisplayName, externalId, envURL)
        token = await createUserToken(userId, envURL)
        await AsyncStorage.setItem('user-id', userId)
        await AsyncStorage.setItem('user-token', token)
      }

      const phyllo = await PhylloConnect.initializePhylloConnect({
        clientDisplayName,
        token,
        userId,
        platformId,
        env: config.env,
      })
      // phyllo.open()
    } catch (e) {
      Alert.alert('Unable to connect platforms')
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
