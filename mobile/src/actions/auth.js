import APIHelper from '../helpers/APIHelper';
import axios from 'axios';
import _ from 'lodash'
//import * as Sentry from '@sentry/react-native'; //#SONRA

import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  USER_LOGOUT,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_AUTH,
  SET_LOCALE,
  SINGUP,
  SINGUP_SUCCESS,
  SINGUP_ERROR,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
} from '../constants/actions';
import { showToast } from '../helpers/ToastHelper';
import I18n from '../i18n';
import { getHeaders, myHeaderConfig } from '../helpers/AuthHelper';
import { getBaseUrl } from '../helpers/UrlHelper';

import { API_ENDPOINTS, API_URL } from '../constants/url';

export const doSignUp = (user) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {

    const url = API_ENDPOINTS.register;
    try {
      dispatch({ type: SINGUP });
      const serverData = (await axios.post(url, user)).data
      console.log({ serverData })
      dispatch({ type: SINGUP_SUCCESS, payload: serverData, succes: "Başarılı" });
      return resolve(serverData)
    } catch (error) {
      console.log("[ERROR]:doSignUp:auth:actions", error.response.data)
      dispatch({ type: SINGUP_ERROR, payload: '', error: "Hata" });
      showToast({ message: _.get(error, "response.data.message", "") });
      return reject(error)
    }

  })

};

export const doSignIn = (user) => async (dispatch) => {
  console.log("!!!doSignIn::", doSignIn)
  try {
    dispatch({ type: LOGIN });
    const url = API_ENDPOINTS.login
    const serverData = (await axios.post(url, user)).data
    const token = serverData._id
    dispatch({ type: LOGIN_SUCCESS, token, payload: { ...serverData.user, token: token } });
  } catch (error) {
    console.log("!!!doSignIn:error:", error)
    const resMessage = _.get(error, "response.data.message", " ").toString()
    dispatch({ type: LOGIN_ERROR, error: resMessage });
    showToast({ message: resMessage });
  }
};

export const doLogout = () => async (dispatch) => {
  try {
    const url = API_ENDPOINTS.logout//`${API_URL}/me/logout`;
    const headers = await myHeaderConfig();
    axios.get(url, headers)
  } catch (error) { }
  finally {
    dispatch({ type: SET_LOCALE, payload: 'en' });
    dispatch({ type: USER_LOGOUT });
  }

};

export const updateUserProfile = (obj) => async (dispatch) => {
  console.log("[]updateUserProfile", obj)
  try {
    dispatch({ type: UPDATE_PROFILE });
    const url = API_ENDPOINTS.updateProfile//`${API_URL}/users/me/update`;
    const headers = await myHeaderConfig();
    const serverData = (await axios.post(url, obj, headers)).data
    console.log("[]updateUserProfile:2", { headers, serverData })
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: serverData });
  } catch (error) {
    console.log("[ERROR]:updateUserProfile", error.response)
    dispatch({ type: UPDATE_PROFILE_ERROR });
  }
  finally { }

};


export const onResetPassword = ({ email }) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD });
    const url = `${API_URL}/users/forgot`
    const response = await axios.post(url, { email });
    const { data } = response;
    showToast({ message: "Devam etmek için mailinizi kontol edin" });
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_ERROR, payload: error });
  }
};



export const resetAuth = () => async (dispatch) => {
  dispatch({ type: RESET_AUTH });
};

export const onLogOut = () => async (dispatch) => {
  dispatch({ type: SET_LOCALE, payload: 'en' });
  dispatch({ type: USER_LOGOUT });
};
