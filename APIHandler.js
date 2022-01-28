import axios from "axios";
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const PHYLLO_BASE_URL = "https://api.dev.getphyllo.com";

const URL_CREATE_USER_TOKEN = "/v1/sdk-tokens";
const URL_CREATE_USER = "/v1/users";

const PHYLLO_CLIENT_ID = "3c132d40-2148-49d2-bb8d-cae55873a69d";
const PHYLLO_SECRET_ID = "1dcba6d8-a61c-4665-a437-046f4a5303de";

const getAxiosInstance = () => {
  const api = axios.create({
    baseURL: PHYLLO_BASE_URL,
    auth: {
      username: PHYLLO_CLIENT_ID,
      password: PHYLLO_SECRET_ID,
    },
  });
  return api;
};
export const createUser = async (name, externalId) => {
  try {
        const api = getAxiosInstance();
        console.log('api instance',api);
      let response = await api.post(URL_CREATE_USER, {
        name: name,
        external_id: externalId,
      });
     // await localStorage.setItem("PHYLLO_USERID", response.data.id);
      console.log('userResponse',response.data);
      return response.data.id;
    
  } catch (err) {
    console.error(`Error ${err} occurred while generating user token`);
    return err.body;
  }
};

export const createUserToken = async (userId) => {
  if (!userId) {
    let err = new Error("User id cannot be blank or null");
    throw err;
  }
  try {
    const api = getAxiosInstance();
    let response = await api.post(URL_CREATE_USER_TOKEN, {
      user_id: userId,
      products: ["IDENTITY", "ENGAGEMENT"],
    });
    console.log('TokenResponse',response.data);
    return response.data.sdk_token;
  } catch (err) {
    console.error(`Error ${err} occurred while generating user token`);
    return err.body;
  }
};