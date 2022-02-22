import React, { useEffect } from 'react'
import PhylloConnect from 'react-native-connect'
import {Text, Button, View} from 'react-native';

const App = () => {
  // useEffect(() => {
  //   console.log(PhyConnectModule)
  // })

  const onPressHandler = () => {
    PhylloConnect.initializePhylloConnect({appName: '', token: '', env: '', platformId: undefined, userId: ''});
  }

  return (
    <View style={{flex: 0.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <Text>'Hello world'</Text>
      <Button title="Connect phyllo" onPress={onPressHandler}/>
      {/* {console.log(PhylloConnect)} */}
    </View>
  )
}

export default App
