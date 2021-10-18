import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_AUTH_HEADER,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_AUTH,
  SET_ACCOUNT,
  UPDATE_USER,
  UPDATE_ACTIVITY_STATUS,
  UPDATE_ACTIVITY_STATUS_SUCCESS,
  UPDATE_ACTIVITY_STATUS_ERROR,
  UPLOAD_USER_PHOTO,
  UPLOAD_USER_PHOTO_SUCCESS,
  UPLOAD_USER_PHOTO_ERROR,
  SINGUP,
  SINGUP_SUCCESS,
  SINGUP_ERROR,
  USER_LOGOUT,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR
} from '../constants/actions';

export const initialState = {
  user: {},
  token: null,
  headers: {},
  isLoggedIn: false,
  isLoggingIn: false,
  isResettingPassword: false,
  isUpdating: true,
  loadingImage: false,
  loading: false,
  error: {},
  success: {},
  userViewer: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggingIn: true, loading: true };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        loading: false,
        user: action.payload,
        token: action.token,
        error: {},
        success: {},
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        loading: false,
        error: action.error,
        user: null,
        success: {},
      };

    case RESET_PASSWORD:
      return {
        ...state,
        isResettingPassword: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isResettingPassword: false,
        success: {},
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        isResettingPassword: false,
        error: action.payload,
      };
    case RESET_AUTH:
      return {
        initialState,
      };
    case SET_AUTH_HEADER:
      return {
        ...state,
        headers: action.payload,
      };

    case SET_ACCOUNT:
      return {
        ...state,
        user: {
          ...state.user,
          account_id: action.payload,
        },
      };

    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };

    case UPDATE_ACTIVITY_STATUS: {
      return {
        ...state,
        isUpdating: true,
      };
    }

    case UPDATE_ACTIVITY_STATUS_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          availability_status: action.payload,
        },
        isUpdating: false,
      };
    }

    case UPDATE_ACTIVITY_STATUS_ERROR: {
      return {
        ...state,
        isUpdating: false,
      };
    }

    case UPLOAD_USER_PHOTO: {
      return {
        ...state,
        loadingImage: true,
      };
    }
    case UPLOAD_USER_PHOTO_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload,
        },
        loadingImage: false,
      };
    }
    case UPLOAD_USER_PHOTO_ERROR: {
      return {
        ...state,
        loadingImage: false,
      };
    }

    case SINGUP: {
      return {
        ...state,
        loading: true,
        error: {},
        success: {}
      };
    }
    case SINGUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload,
        success: "action.success",
        error: {}
      };
    }
    case SINGUP_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        user: {},
        error: {},
        success: {},
        token: null
      };
    }

    case UPDATE_PROFILE: {
      return {
        ...state,
        loading: true,
      }
    }
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload
      }
    }
    case UPDATE_PROFILE_ERROR: {
      return {
        ...state,
        loading: false,
      }
    }



    default:
      return state;
  }
};
