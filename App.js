/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component, Fragment} from 'react';
 import {
   View,
   StyleSheet,
   SafeAreaView,
   Text,
   Alert,
   Button,
   TouchableOpacity,
   Dimensions,
   Platform,
   KeyboardAvoidingView,
   ActivityIndicator,
   NativeEventEmitter,
   NativeModules,
 } from 'react-native';

 var phyllo = NativeModules.NativeMethods;

 class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

    this.eventEmitter = new NativeEventEmitter(phyllo);
    this.onAccountConnectedListener = this.eventEmitter.addListener(
      'onAccountConnected',
      this.onAccountConnected.bind(this),
    );
    this.onAccountDisconnectedListener = this.eventEmitter.addListener(
      'onAccountDisconnected',
      this.onAccountDisconnected.bind(this),
    );
    this.onTokenExpiredListener = this.eventEmitter.addListener(
      'onTokenExpired',
      this.onTokenExpired.bind(this),
    );

    this.onExitListener = this.eventEmitter.addListener(
      'onExit',
      this.onExit.bind(this),
    );
  }

  componentWillUnmount() {
  
    this.onAccountConnectedListener.remove();
    this.onAccountDisconnectedListener.remove();
    this.onTokenExpiredListener.remove();
    this.onExitListener.remove();
  }

  onAccountConnected(body) {
    console.log('onAccountDisconnected callback', body);
  }

  onAccountDisconnected(body) {
    console.log('onAccountDisconnected callback', body);
  }

  onTokenExpired(body) {
    console.log('onTokenExpired callback', body);
  }

  onExit(body) {
    console.log('onExit callback', body);
  }

  initializePhylloConnect = value => {
    phyllo.initialize(
      'ReactNative',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNjgzYzAzMGMtZDBmZC00NjI0LWE4YzAtNGMwNTNjMjFjYzFkIiwidGVuYW50X2lkIjoiZGRkNWU0YzUtZjQ1Zi00YzU2LWI0MjgtM2QzMjllOGE1YTE1IiwidGFuYW50X2FwcF9pZCI6IjI3NzhjOTk3LWY0YmMtNDAxZC05NWM0LTZmMjE3OGI4NTQwNCIsInByb2R1Y3RzIjpbIklERU5USVRZIiwiRU5HQUdFTUVOVCIsIklOQ09NRSJdLCJpc3MiOiJodHRwczovL2FwaS5kZXYuZ2V0cGh5bGxvLmNvbSIsImF1ZCI6Imh0dHBzOi8vYXBpLmRldi5nZXRwaHlsbG8uY29tL3YxL2ludGVybmFsIiwiaWF0IjoxNjQzMDk5NTA2Ljg1MiwiZXhwIjoxNjQzNzA0MzA2Ljg1MTk4NH0.38hDrSoE8K5rSZ_oGZX6Nntafx2Jb9qlywrquGh1KFA',
      '683c030c-d0fd-4624-a8c0-4c053c21cc1d',
      'dev',
      value
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="Connect Platform Account(s)"
          onPress={() => {
            this.initializePhylloConnect('');
          }}
        />
      </View>
      <Separator />
      <View>
        <Button
          title="Connect Instagram using Phyllo"
          onPress={() => {
            this.initializePhylloConnect('9bb8913b-ddd9-430b-a66a-d74d846e6c66');
          }}
        />
      </View>
      <Separator />
      <View>
        <Button
          title="Connect YouTube using Phyllo"
          onPress={() => {
            this.initializePhylloConnect('14d9ddf5-51c6-415e-bde6-f8ed36ad7054');
          }}
        />
      </View>
      <Separator />
    </SafeAreaView>
    );
  }

 }

 const Separator = () => (
  <View style={styles.separator} />
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
