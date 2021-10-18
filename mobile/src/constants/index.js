

const colors = {
    primary: "#00C26D",
    softlight: "#dfe6e9",
    secondary: "#a5b1c2",
    white: "#FFFFFF",
    black: "#2d3436",
    heartFill: "#d63031",
    danger: "#c0392b",
    background: "#dfe6e9",
    bg_grey: "#F4F6FA",
    SECONDARY_COLOR: "#5636B8",
    WHITE: "#FFFFFF",
    GRAY: "#757E90",
    DARK_GRAY: "#363636",
    BLACK: "#000000",
}

const SECONDARY_COLOR = "#5636B8";
const WHITE = "#FFFFFF";
const GRAY = "#757E90";
const DARK_GRAY = "#363636";
const BLACK = "#000000";



const appinfo = {
    key: "pivoicechat",
    name: "Pi Voice Chat"
}


export const cdnConfig = {
    full_url: "https://pistatic.piyanos.com/upload/publicdata",
    token: "basitguvenliksonra-dinamk-34",
    key: "piyvoicechat"
}




export const defaultImages = {
    userAvatarLogo: "https://pistatic.piyanos.com/uploads/tandir/tandir-logo-x512.png",
    userAvatar: "https://pistatic.piyanos.com/uploads/tandir/tandir-logo-x512.png",

}


export { colors, appinfo }



import images from './images';

export const MAXIMUM_FILE_UPLOAD_SIZE = 40;

export const CONVERSATION_STATUS = {
    OPEN: 'open',
    RESOLVED: 'resolved',
    BOT: 'bot',
};

export const MESSAGE_TYPES = {
    INCOMING: 0,
    OUTGOING: 1,
    ACTIVITY: 2,
};

export const MESSAGE_STATUS = {
    SENT: 0,
    DELIVERED: 1,
    READ: 2,
    FAILED: 3,
};

export const ASSIGNEE_TYPE = {
    ME: 'me',
    UN_ASSIGNED: 'unassigned',
    ALL: 'all',
};

export const INBOX_ICON = {
    'Channel::All': 'copy-outline',
    'Channel::WebWidget': 'globe-outline',
    'Channel::TwitterProfile': 'twitter-outline',
    'Channel::FacebookPage': 'facebook-outline',
    'Channel::TwilioSms': 'message-circle-outline',
    'Channel::Api': 'inbox-outline',
    'Channel::Email': 'email-outline',
};

export const INBOX_IMAGES = {
    'Channel::TwitterProfile': images.twitterBadge,
    'Channel::FacebookPage': images.fbBadge,
    'Channel::TwilioSms': images.whatsAppBadge,
};

export const LANGUAGES = {
    en: 'English',
    nl: 'Dutch',
    tr: 'Turkish',
};

export const URL_REGEX = {
    CONVERSATION: 'app/accounts/[-0-9]+/conversations/[-0-9]',
};

export const CONVERSATION_TOGGLE_STATUS = {
    open: 'RESOLVE',
    resolved: 'RE_OPEN',
};

export const PRESENCE_STATUS_COLORS = {
    online: '#44ce4b',
    busy: '#ffc532',
};

export const AVAILABILITY_TYPES = {
    online: 'ONLINE',
    busy: 'BUSY',
    offline: 'OFFLINE',
};

export const NOTIFICATION_PREFERENCE_TYPES = {
    push_conversation_creation: 'CONVERSATION_CREATE_PUSH',
    push_conversation_assignment: 'CONVERSATION_ASSIGNEE_PUSH',
    push_assigned_conversation_new_message: 'CONVERSATION_ASSIGNED_NEW_MESSAGE_PUSH',
    email_conversation_creation: 'CONVERSATION_CREATE_EMAIL',
    email_conversation_assignment: 'CONVERSATION_ASSIGNEE_EMAIL',
    email_assigned_conversation_new_message: 'CONVERSATION_ASSIGNED_NEW_MESSAGE_EMAIL',
};

export const SETTINGS_ITEMS = [
    {
        text: 'SWITCH_ACCOUNT',
        checked: false,
        iconName: 'briefcase-outline',
        itemName: 'switch-account',
    },

    {
        text: 'AVAILABILITY',
        checked: true,
        iconName: 'radio-outline',
        itemName: 'availability',
    },

    {
        text: 'NOTIFICATION',
        checked: true,
        iconName: 'bell-outline',
        itemName: 'notification',
    },
    {
        text: 'CHANGE_LANGUAGE',
        checked: true,
        iconName: 'globe-outline',
        itemName: 'language',
    },
    {
        text: 'HELP',
        checked: true,
        iconName: 'question-mark-circle-outline',
        itemName: 'help',
    },
    {
        text: 'CHAT_WITH_US',
        checked: true,
        iconName: 'headphones-outline',
        itemName: 'chat_with_us',
    },
    {
        text: 'LOG_OUT',
        checked: false,
        iconName: 'log-out-outline',
        itemName: 'logout',
    },
];
