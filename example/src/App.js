import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Button, Text, Alert } from 'react-native'
import PhylloSDK from 'react-native-connect'
import AsyncStorage from '@react-native-async-storage/async-storage'

import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { createUser, createUserToken } from './APIHandler'

export default function TesterApp() {
  const [existingUser, setExistingUser] = useState(false)

  useEffect(() => {
    PhylloSDK.addAnEventListener('onExit', onExitCallBack)
    return () => {
      PhylloSDK.phylloDisconnect()
    }
  }, [])

  const onExitCallBack = () => {
    console.log('exited from the phyllo connect')
  }

  const onPressButton = async (platformId = '') => {
    const env = 'development'
    const timeStamp = new Date()
    const appName = 'Sample App'
    let userId, token

    try {
      if (existingUser) {
        userId = await AsyncStorage.getItem('user-id')
        token = await AsyncStorage.getItem('user-token')
        if (!token || !userId) {
          Alert.alert('User does not exist')
        }
      } else {
        userId = await createUser('SampleApp', timeStamp.getTime())
        token = await createUserToken(userId)
        await AsyncStorage.setItem('user-id', userId)
        await AsyncStorage.setItem('user-token', token)
      }

      const phyllo = await PhylloSDK.initializePhylloConnect({
        appName,
        token,
        userId,
        env,
        platformId,
      })
      // phyllo.open()
    } catch (e) {
      Alert.alert('Unable to connect platforms')
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
