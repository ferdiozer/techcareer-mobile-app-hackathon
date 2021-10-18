
import {
    GET_TEST,
    SET_TEST,
    GET_HOME_RECS,
    GET_HOME_RECS_SUCCESS,
    GET_HOME_RECS_ERROR,
    SWIPED_RIGHT,
    SWIPED_LEFT,
    GET_MATCHES,
    GET_MATCHES_SUCCESS,
    GET_MATCHES_ERROR
} from '../constants/actions';

import demoRecs from '../assets/data/Recs';
import { showToast } from '../helpers/ToastHelper';

import _ from 'lodash'
import axios from 'axios'

import { API_ENDPOINTS, API_URL } from '../constants/url';
import { myHeaderConfig } from '../helpers/AuthHelper';


export const searchUser = (search) => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        const url = API_ENDPOINTS.searchUser;
        try {
            const headers = await myHeaderConfig();
            const serverData = (await axios.post(url, { search }, headers)).data
            return resolve(serverData)
        } catch (error) {
            console.log("[ERROR]:searchUser", error.response.data)
            showToast({ message: _.get(error, "response.data.message", "") });
            return reject(error)
        }
    })
}

export const getMe = () => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        const url = API_ENDPOINTS.me;
        try {
            const headers = await myHeaderConfig();
            const serverData = (await axios.get(url, headers)).data
            return resolve(serverData)
        } catch (error) {
            console.log("[ERROR]:getMe", error.response.data)
            showToast({ message: _.get(error, "response.data.message", "") });
            return reject(error)
        }
    })
}



export const testHomeChange = (newItem) => async (dispatch) => {
    dispatch({ type: SET_TEST, payload: newItem, conversationStatus: "11newItem" });
};

export const testHomeChange1 = (newItem) => async (dispatch) => {
    dispatch({ type: SET_TEST, payload: ["1", "2"], conversationStatus: "newItem" });
};
///////////////////#HOME/////////////////////////////////
export const getHomeRecs = (page = 1) => async (dispatch) => {
    console.log("!!:getHomeRecs:")
    try {
        dispatch({ type: GET_HOME_RECS });
        const headers = await myHeaderConfig();
        const { data } = (await axios.get(API_ENDPOINTS.getHomeRecs + "?page=" + page, headers)).data
        dispatch({ type: GET_HOME_RECS_SUCCESS, recs: data });
    } catch (error) {
        console.log("[ERROR]", error.response.data)
        dispatch({ type: GET_HOME_RECS_ERROR, error: "kayıt bulunamadı", });
    }
};

export const swipedRight = ({ id, action = "swipe" }) => async (dispatch, getState) => {
    const url = `${API_ENDPOINTS.swipedRight}/${id}`
    const headers = await myHeaderConfig();
    try {
        await axios.get(url, headers)
        const { recs: localRecs } = await getState().home;
        // const { token } = await getState().auth;
        // console.log({ token })
        if (action == "button") {
            dispatch({ type: SWIPED_RIGHT, recs: localRecs.filter(v => v._id !== id) });
        }

    } catch (error) {
        console.log("[ERROR]:swipedRight", error.response.data)
    }

};

export const swipedLeft = ({ id, action = "swipe" }) => async (dispatch, getState) => {
    const url = `${API_ENDPOINTS.swipedLeft}/${id}`
    const headers = await myHeaderConfig();
    try {
        await axios.get(url, headers)
        const { recs: localRecs } = await getState().home;
        if (action == "button") {
            dispatch({ type: SWIPED_LEFT, recs: localRecs.filter(v => v._id !== id) });
        }

    } catch (error) {
        console.log("[ERROR]:swipedRight", error.response.data)
    }

};
///////////////////#HOME-end/////////////////////////////////


///////////////////#Matches-end/////////////////////////////////
export const getMatches = (page = 1) => async (dispatch) => {
    dispatch({ type: GET_MATCHES });
    const url = API_ENDPOINTS.getMatches
    try {
        const headers = await myHeaderConfig();
        const { data } = (await axios.get(url, headers)).data
        dispatch({ type: GET_MATCHES_SUCCESS, payload: data });
    } catch (error) {
        console.log(error)
        dispatch({ type: GET_MATCHES_ERROR });
    }
};

export const setUserStatus = (page = 1) => async (dispatch) => {

};

///////////////////#Matches/////////////////////////////////