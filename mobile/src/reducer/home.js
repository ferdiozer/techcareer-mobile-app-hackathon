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

const initialState = {
    loading: false,
    conversationStatus: 'open',
    item: "null",
    name: "boş",
    payload: [],
    recs: [],
    matches: [],
    errorMessage: "",
    error: false,
    succes: true

};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TEST: {
            return {
                ...state,
                conversationStatus: "changed",
                payload: action.payload
            };
        }
        case GET_TEST: {
            return {
                ...state,
                loading: true,
                isAllConversationsLoaded: false,
                data: {
                    meta: state.data.meta,
                    payload: [],
                },
            };
        }
        case GET_HOME_RECS: {
            return {
                ...state,
                loading: true,
                error: false,
                succes: false
            };
        }
        case GET_HOME_RECS_SUCCESS: {
            return {
                ...state,
                loading: false,
                recs: action.recs,
                error: false,
                succes: true
            };
        }
        case GET_HOME_RECS_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
                succes: false
            };
        }
        case SWIPED_RIGHT: {
            return {
                ...state,
                recs: action.recs
            };
        }
        case SWIPED_LEFT: {
            return {
                ...state,
                recs: action.recs
            };
        }
        case GET_MATCHES: {
            return {
                ...state,
                loading: true,
            };
        }
        case GET_MATCHES_SUCCESS: {
            return {
                ...state,
                matches: action.payload,
                error: true,
                succes: false,
                loading: false,
            };
        }
        case GET_MATCHES_ERROR: {
            return {
                ...state,
                error: true,
                succes: false,
                loading: false,
            };
        }



        default:
            return state;
    }
};
