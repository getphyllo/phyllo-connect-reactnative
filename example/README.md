<h1 align="center">
  <a href="https://docs.getphyllo.com/">
    Phyllo connect react-native SDK
  </a>
  <br>
  Sample application
</h1>
<p align="center">Sample apps using the Phyllo connect React Native SDK on both iOS and Android.</p>

## 📋 Requirements

To get started, you will require the client ID and secret to access the Phyllo environment. To get your API credentials, please reach out at contact@getphyllo.com.

## 🏁 Getting Started

### Install the application in your local system

Clone this example from github and move inside example project, Install all npm dependencies.

```bash
git clone https://github.com/getphyllo/phyllo-connect-reactnative.git
cd phyllo-connect-reactnative/example
npm install
```

### Install iOS dependencies using pods

```bash
cd ios && pod install
```

### 🔑 Add your credentials in `example/src/config.js` file

> Assuming you have a client ID and secret, if not reach out at contact@getphyllo.com

```sh
clientId = 'YOUR-CLIENT-ID'
clientSecret = 'YOUR-SECRET-KEY'
env = 'APPLICATION-ENVIRONMENT'
```

Set the env to `production` or `sandbox`

### 🚀 To launch the application, run the following commands in example folder:

Run the application using npm

```bash
npm run ios
npm run android
```

Make sure you have a metro bundler running or run using

```sh
npm start
```

Are you facing any issue? Feel free to raise an issue in the [issues section](<(https://github.com/getphyllo/phyllo-connect-reactnative/issues)>)
