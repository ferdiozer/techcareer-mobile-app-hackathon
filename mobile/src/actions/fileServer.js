import APIHelper from '../helpers/APIHelper';
import axios from 'axios';
//import * as Sentry from '@sentry/react-native'; //#SONRA
import FormData from 'form-data'

import {
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    USER_LOGOUT,
    SET_AUTH_HEADER,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    RESET_AUTH,
    SET_LOCALE,
    SET_ACCOUNT,
    UPDATE_USER,
    UPDATE_ACTIVITY_STATUS,
    UPDATE_ACTIVITY_STATUS_SUCCESS,
    UPDATE_ACTIVITY_STATUS_ERROR,
    UPLOAD_USER_PHOTO,
    UPLOAD_USER_PHOTO_SUCCESS,
    UPLOAD_USER_PHOTO_ERROR,
    UPDATE_PROFILE
} from '../constants/actions';


import { showToast } from '../helpers/ToastHelper';
import I18n from '../i18n';
import { getHeaders } from '../helpers/AuthHelper';
import { getBaseUrl } from '../helpers/UrlHelper';

import { API_URL } from '../constants/url';
import { updateUserProfile } from './auth';
import { cdnConfig } from '../constants';


//const FormData = require('form-data')



export const uploadAvatarPhoto = ({ photo, action }) => async (dispatch) => {
    console.log("file server uploadAvatarPhoto", photo)
    dispatch({ type: UPLOAD_USER_PHOTO });

    const url = `${cdnConfig.full_url}`;
    const formData = new FormData();
    formData.append('token', cdnConfig.token);
    formData.append('key', cdnConfig.key);
    formData.append('subkey', "useravatars");
    formData.append('file', photo);
    const headers = { headers: { 'Content-Type': 'multipart/form-data' } }

    try {
        const serverData = (await axios.post(url, formData, headers)).data;
        console.log("uploadAvatarPhoto", { serverData })
        dispatch({ type: UPLOAD_USER_PHOTO_SUCCESS, payload: serverData.path });
        if (action == "profileAvatarUpdate") {
            dispatch(updateUserProfile({ type: UPDATE_PROFILE, avatar: serverData.path, action: "avatar" }))
        }

    } catch (error) {
        console.log(error.response)
        dispatch({ type: UPLOAD_USER_PHOTO_ERROR, payload: error });
    }
};

export const uploadSoundFile = ({ file }) => async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { user } = await getState().auth;
            const url = `${cdnConfig.full_url}`;  //"https://www.piyanos.com/"//`${cdnConfig.full_url}`;
            const formData = new FormData();
            formData.append('token', cdnConfig.token);
            formData.append('key', cdnConfig.key);
            formData.append('subkey', "soundfiles");
            formData.append('folder', `${user._id}`);
            formData.append('file', file);
            const headers = { headers: { 'Content-Type': 'multipart/form-data' } }
            // console.log("USER:", { file: file.type,})
            const serverData = (await axios.post(url, formData, headers)).data;
            console.log("fileServer:uploadSoundFile", { serverData })
            return resolve(serverData)
        } catch (error) {
            console.log("[ERROR01]:fileServer:", { er: error.response })
            return reject(error)
        }
    })
}

export const onResetPassword = ({ email }) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD });
        const response = await APIHelper.post('auth/password', { email });
        const { data } = response;
        showToast(data);

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.path });
    } catch (error) {
        dispatch({ type: RESET_PASSWORD_ERROR, payload: error });
    }
};

export const getAccountDetails = () => async (dispatch) => {
    try {
        const result = await APIHelper.get('');

        const {
            data: { locale },
        } = result;
        dispatch({ type: SET_LOCALE, payload: locale || 'en' });
    } catch (error) { }
};

export const resetAuth = () => async (dispatch) => {
    dispatch({ type: RESET_AUTH });
};

export const onLogOut = () => async (dispatch) => {
    dispatch({ type: SET_LOCALE, payload: 'en' });
    dispatch({ type: USER_LOGOUT });
};

export const setAccount = ({ accountId }) => async (dispatch) => {
    dispatch({ type: SET_ACCOUNT, payload: accountId });
};
// Add/Update availability status of agents
export const addOrUpdateActiveUsers = ({ users }) => async (dispatch, getState) => {
    const { user: loggedUser } = await getState().auth;
    if (loggedUser) {
        Object.keys(users).forEach((user) => {
            if (parseInt(user) === loggedUser.id) {
                loggedUser.availability_status = users[user];
                dispatch({
                    type: UPDATE_USER,
                    payload: loggedUser,
                });
            }
        });
    }
};

export const updateAvailabilityStatus = ({ availability }) => async (dispatch) => {
    dispatch({ type: UPDATE_ACTIVITY_STATUS });
    try {
        const headers = await getHeaders();
        const baseUrl = await getBaseUrl();

        await axios.put(
            `${baseUrl}${API_URL}profile`,
            {
                availability,
            },
            {
                headers: headers,
            },
        );

        dispatch({
            type: UPDATE_ACTIVITY_STATUS_SUCCESS,
            payload: availability,
        });
    } catch (error) {
        dispatch({ type: UPDATE_ACTIVITY_STATUS_ERROR, payload: error });
    }
};
