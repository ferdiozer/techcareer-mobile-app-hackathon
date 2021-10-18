export const URL_TYPE = 'https://';

export const BASE_URL = 'https://chat10.piyanos.com';
export const API_URL = 'https://tandir.piyanos.com/api';
export const FILE_CDN_URL = 'https://pistatic.piyanos.com/upload/publicdata';

export const SIGNUP_URL = 'app/auth/signup';

export const HELP_URL = 'https://www.piyanos.com/docs';


//export const SOCKET_URL = "https://chat10.piyanos.com"
export const SOCKET_URL = "https://tandir.piyanos.com"





export const API_ENDPOINTS = {
    getHomeRecs: `${API_URL}/home/recs`,
    swipedRight: `${API_URL}/home/swiped/right`,
    swipedLeft: `${API_URL}/home/swiped/left`,
    getMatches: `${API_URL}/users/me/matches`,

    getConversationsOld: `${API_URL}/me/conversation`,
    getUserProfile: `${API_URL}/users`,
    createMessageOld: `${API_URL}/me/conversation/create-message`,

    register: `${API_URL}/users`,

    getMessagesByUserId: (userId, limit, offset) => `${API_URL}/pivoicechat/conversation/messages/${userId}?limit=${limit}&offset=${offset}`,
    getConversations: `${API_URL}/pivoicechat/conversation`,
    createMessage: `${API_URL}/pivoicechat/conversation/create-message`,
    setNotificationSubscriptions: `${API_URL}/pivoicechat/users/me/notification/subscriptions`,
    searchUser: `${API_URL}/pivoicechat/users/search`,
    me: `${API_URL}/pivoicechat/users/me`,
    login: `${API_URL}/pivoicechat/users/login`,
    logout: `${API_URL}/pivoicechat/users/logout`,
    updateProfile: `${API_URL}/pivoicechat/users/me/update`,
}