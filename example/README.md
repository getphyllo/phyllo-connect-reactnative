<h1 align="center">
  <a href="https://docs.getphyllo.com/">
    Phyllo connect react-native SDK
  </a>
  <br>
  Sample application
</h1>

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

### 🔑 Add your client ID and secrets to `example/.env` file

Set the environment to `development` or `production` or `sandbox`

```
CLIENT_ID="YOUR-CLIENT-ID"
CLIENT_SECRET="YOUR-CLIENT-SECRET"
ENVIRONMENT="YOUR-DEV-ENVIRONMENT"
```

### 🚀 To launch the application, run the following commands in example folder:

To run in iOS platform

```bash
npm run ios
```

To run in Android platform

```bash
npm run android
```

Are you facing any issue? Feel free to raise an issue in the [issues section](<(https://github.com/getphyllo/phyllo-connect-reactnative/issues)>)
