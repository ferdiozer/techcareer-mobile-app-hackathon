import React, { useEffect, useState, useRef, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    TextInput,
    FlatList,
    Button,
    RefreshControl,
    SectionList,
    VirtualizedList,
    Platform,
    DeviceEventEmitter
} from 'react-native';

import { useIsFocused } from '@react-navigation/native'
import ActionSheet from "react-native-actionsheet";

import ChatHeader from '../components/ChatHeader';
import ChatFooter from '../components/ChatFooter';
import ScrollToBottomButton from '../components/ScrollToBottomButton';
import _ from "lodash";
import moment from "moment";

import Loading from '../components/Loading';
import SoundFooter from '../components/SoundFooter';

import RecordLogic from '../components/RecordLogic';

import { AuthContext } from '../context/AuthContext';
import { colors, defaultImages } from '../constants';

import { connect } from 'react-redux';
import {
    getMessagesByUserId,
    sendMessage1,
    resetGetMessagesByUserId,
    addMessageItem,

} from '../actions/conversation';

import { uploadSoundFile, uploadAvatarPhoto } from '../actions/fileServer'


import RNFS, { readFile } from "react-native-fs";

import i18n from '../i18n';


import voiceChanger from 'react-native-voice-changer';
import { check, PERMISSIONS, request } from 'react-native-permissions';
import { AudioUtils } from 'react-native-audio';



import effects from '../assets/effects';
import SoundMessageItem from '../components/SoundMessageItem';

const ChatScreen = (props) => {

    const isFocused = useIsFocused()

    const { socket } = useContext(AuthContext);
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false);
    const [showScrollToButton, setShowScrollToButton] = useState(false);
    const [permissionList, setPermissionList] = useState([]);
    const [typing, setTyping] = useState("");
    const [footerType, setFooterType] = useState("voice");

    const [playingAudio, seyPlayingAudio] = useState({});






    const [offsetLimit, setOffsetLimit] = useState({ limit: 50, offset: 0 });

    const [selectedEffect, setSelectedEffect] = useState(effects[0]);

    const sectionListReference = useRef(null)
    const refActionSheet = useRef();

    const { loading } = props
    let user = _.get(props, "route.params.item.user", {})
    const item = _.get(props, "route.params.item", {})
    //  console.log("!!:ChatScreen", { user, item })
    const myUserId = _.get(props, "currentUser._id", "")
    const data = _.get(props, "messages", [])



    const efectOptions = effects.map(v => {
        if (v.id == selectedEffect.id) return `✓ ${v.name}`
        else {
            return v.name
        }
    });//["efekt 1", "efekt 2", "test"]


    const firstSocket = () => {
        if (socket) {
            socket.on("private-message", async (arg) => {
                console.log("private-message!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", arg)
                if (_.get(arg, "fromUser") == _.get(user, "_id")) {
                    console.log(":!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                    props.addMessageItem(arg)
                    //  props.onPrivateMessage(arg)
                }

            })
        }
    }




    useEffect(() => {
        firstSocket()
        _checkPermissions()
    }, []);

    useEffect(() => {
        if (isFocused) {
            getItems(user._id);
        }

        return () => {
            //unmount olduğunda
            props.resetGetMessagesByUserId()
        }

    }, [isFocused]);



    const _checkPermissions = () => {
        let permissions = [
            PERMISSIONS.ANDROID.RECORD_AUDIO,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.CAMERA,
        ];

        Promise.all(permissions.map(check)).then(async response => {
            console.log('permissions', response);
            setPermissionList(response)
            for (let i = 0; i < permissions.length; i++) {
                if (response[i] !== 'granted') {
                    await _requestPermission(permissions[i], i);
                }
            }
            voiceChanger.createOutputDir();
        });
    };

    const _requestPermission = (type, idx) => {
        return new Promise((resolve, reject) => {
            request(type).then(response => {
                // Returns once the user has chosen to 'allow' or to 'not allow' access
                // Response is one of: 'granted', 'denied', 'blocked' {
                setPermissionList(permissionList.map((p, i) => i === idx ? response : p))
                resolve(response);
            });
        });
    };



    const getItems = async (userId) => {
        await props.getMessagesByUserId({ userId, limit: offsetLimit.limit, offset: offsetLimit.offset })
        setOffsetLimit({ ...offsetLimit, offset: offsetLimit.offset + offsetLimit.limit })
    }


    const onPressIcon = async ({ action = "back" }) => {
        switch (action) {
            case "back":
                props.navigation.goBack()
                break;
            case "delete-all":
                break;
            case "go-profile":
                props.navigation.navigate("UserProfile", { item: user })
                break;
            case "set-footerType":
                setFooterType(footerType == "voice" ? "text" : "voice")
                break;
            default:
                break;
        }
    }


    const send = async () => {
        props.sendMessage({ user, message: typing })
        setTyping('')
        if (!showScrollToButton) {
            scrollToBottom()
        }
    }


    const deleteMessage = (item) => {
        Alert.alert(_.get(item, "message"), "Silinsin mi?",
            [
                {
                    text: "Evet Sil", onPress: () => {
                        console.log("Mesaj Sil")
                    }
                },
                { text: 'İptal', onPress: () => console.log('OK Pressed') }
            ], { cancelable: true })
    }

    const setCurrentReadOffset = (event) => {
        const scrollHight = Math.floor(event.nativeEvent.contentOffset.y);
        if (scrollHight > 50) {
            setShowScrollToButton(true)
        } else {
            setShowScrollToButton(false)
        }
    }

    const scrollToBottom = () => {
        setShowScrollToButton(false)
        if (sectionListReference) {
            sectionListReference.current?.scrollToLocation({
                animated: true,
                itemIndex: 0,
                viewPosition: 0,
            });
        }

    }

    const showEfectActionSheet = () => {
        refActionSheet.current?.show()
    }


    const loadMoreMessages = async () => {
        await props.getMessagesByUserId({ userId: user._id, limit: offsetLimit.limit, offset: offsetLimit.offset })
        setOffsetLimit({ ...offsetLimit, offset: offsetLimit.offset + offsetLimit.limit })
        //  props.ChatStore.getOtherMessagesInConversation(offsetLimit.offset, offsetLimit.limit, user._id)
        console.log("!!loadMoreMessages")
    }

    const onEndReached = ({ distanceFromEnd }) => {
        if (!onEndReachedCalledDuringMomentum) {
            loadMoreMessages();
            setOnEndReachedCalledDuringMomentum(true)
        }
    };

    const uploadSoundFile = async (response) => {
        try {
            const serverData = await props.uploadSoundFile({
                file: {
                    name: "audio.wav",
                    type: "audio/wav",
                    uri: `file://${response.uri}`
                }
            })

            const { path } = serverData
            console.log("serverData", serverData)
            props.sendMessage({
                user,
                audio: {
                    path,
                    effectId: selectedEffect.id
                },
                messageType: "audio"
            })
        } catch (error) {
            console.log("uploadSoundFile:ERROR:catch", error)
        }


        //  //   const filePath = "/data/user/0/com.piyanos.tandir/files/record.wav"
        //  const filePath = "/data/user/0/com.piyanos.piyvoicechat/files/record.wav"
        //  try {
        //      // RNFS.readFile(`/data/user/0/com.piyanos.tandir/files/record.wav`, 'base64')
        //      //     .then(o => console.log(o, 'base64 audio'))
        //      //     .catch(e => console.log(e, 'err ==?> asdasd'))
        //      //
        //      const base64String = await readFile(filePath, "base64");
        //      // const readedFile = await RNFS.readFile(filePath)
        //      // console.log("base64String", base64String)
        //      // console.log("readedFile", readedFile)
        //      const serverData = await props.uploadSoundFile({
        //          file: {
        //              name: "filename",
        //              type: "audio/wav",
        //              uri: base64String
        //          }
        //      })
        //      //  const serverData = await props.uploadSoundFile({
        //      //      file: {
        //      //          name: "isim",
        //      //          type: "audio/wav",
        //      //          uri: "/data/user/0/com.piyanos.tandir/files/record.wav"
        //      //      }
        //      //  })
        //      console.log("serverData", serverData)
        //  } catch (error) {
        //      console.log("uploadSoundFile:ERROR:", error)
        //  }



        //  //  const base64String = await readFile("/data/user/0/com.piyanos.tandir/files/record.wav", "base64");
        //  const serverData = await props.uploadAvatarPhoto({
        //      photo: {
        //          name: "isim",
        //          type: "audio/wav",//"audio/mp3",
        //          uri: "/data/user/0/com.piyanos.tandir/files/record.wav"//base64String
        //      }
        //  })



        // const serverData = await props.uploadSoundFile({
        //     file: {
        //         name: "isim",
        //         type: "audio/x-wav",
        //         uri: "/data/user/0/com.piyanos.tandir/files/record.wav"
        //     }
        // })

        //   const fileSound = {
        //       name: "record",
        //       type: "audio/x-wav",
        //       uri:
        //           Platform.OS === "android" ? response.uri : response.uri.replace("file://", "")
        //   }
        //   try {
        //       const serverData = await props.uploadSoundFile({ file: fileSound })
        //       console.log(":::uploadSoundFile:::", { serverData })
        //   } catch (error) {
        //       console.log("!!SERVER:HATA:", error.response?.data)
        //   }
        //

    }

    const onStopSound = (data) => {
        console.log("onStopSound::", data)
        uploadSoundFile({ uri: data.audioFile })
    }

    const onPlayAudio = (messageItem) => {
        console.log("onPlayAudio:", messageItem)
        seyPlayingAudio(messageItem)
        //react-native-voice-changer
    }

    const renderMoreLoader = () => {
        let count = _.get(props, "route.params.item.count", 0)
        const isAllMessagesLoaded = data.length === count/// ? true : false
        return (
            <View style={styles.loadMoreSpinnerView}>
                {!isAllMessagesLoaded && loading ? <Loading type="message" /> : null}
            </View>
        )
    };

    const renderItem = ({ item }) => {
        let inMessage = myUserId === item.fromUser;
        let itemStyle = !inMessage ? styles.itemIn : styles.itemOut;

        if (item.messageType == "text") {
            return (
                <TouchableOpacity activeOpacity={1}
                    //    onLongPress={(e) => item.fromUser == myUserId ? deleteMessage(item) : () => { }}
                    style={[styles.item, itemStyle]}>

                    <View style={[styles.balloon]}>
                        <Text style={[styles.itemMessage, inMessage && { color: '#000' }]}>{item.message}</Text>
                    </View>
                    {renderDate(item.created)}
                </TouchableOpacity>

            )
        }
        else if (item.messageType == "audio") {
            return (
                <TouchableOpacity
                    activeOpacity={1}
                    //onPress={() => onPlayAudio(item)}
                    //    onLongPress={(e) => item.fromUser == myUserId ? deleteMessage(item) : () => { }}
                    style={[styles.item, itemStyle, {
                        borderWidth: playingAudio._id === item._id ? 0.6 : 0,
                        borderColor: colors.primary
                    }]}>

                    <View style={[styles.balloon]}>
                        <RecordLogic
                            playingAudio={playingAudio}
                            onPlay={(item) => onPlayAudio(item)}
                            playing={playingAudio._id === item._id}
                            item={item}
                            type="messageItem"
                        />

                        {
                            // <SoundMessageItem
                            //     playing={playingAudio._id === item._id}
                            //     iconColor={colors.primary}
                            // />
                        }
                    </View>
                    {renderDate(item.created)}
                </TouchableOpacity>

            )
        }

        else {
            return (
                <View />
            )
            //hiçbirşey
        }


    }
    const renderDate = (date) => {
        // SONRA EĞER Bir dk tan az ise ŞİMDİ yazdır
        //  const currentDate = new Date().getMinutes()
        //  var duration = moment.duration(end.diff(startTime));
        //  var hours = duration.asHours();
        const a = moment(new Date());//now
        const b = moment(date);

        return (
            <View>
                <Text style={styles.time}>
                    {

                        a.diff(b, 'minutes') > 1
                            ?
                            moment(date).fromNow()
                            :
                            i18n.t("chat.now")
                    }

                </Text>
            </View>
        );
    }


    const isAllMessagesLoaded = data.length === _.get(item, "count", 0)/// ? true : false



    //  console.log({ data, props: props })

    return (
        <View style={styles.container}>
            <ChatHeader
                //   right
                avatar={user.avatar}
                footerType={footerType}
                // loading={loading}
                onPressIcon={(e) => onPressIcon(e)}
                name={_.get(user, "name", "")}

            />
            {!isAllMessagesLoaded && loading ? <Loading type="message" /> : null}
            <SectionList style={styles.list}
                sections={[{ data: data }]}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                keyboardShouldPersistTaps="never"
                scrollEventThrottle={16}
                onScroll={setCurrentReadOffset}
                ref={sectionListReference}
                inverted
                onEndReached={onEndReached.bind(this)}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={() => {
                    setOnEndReachedCalledDuringMomentum(false)
                }}
                style={styles.chatContainer}
            //  ListFooterComponent={renderMoreLoader}

            />
            {showScrollToButton && <ScrollToBottomButton scrollToBottom={scrollToBottom} />}

            {
                footerType == "voice"
                    ?
                    <SoundFooter
                        onStopSound={onStopSound}
                        effectName={selectedEffect.name}
                        showEfectActionSheet={showEfectActionSheet}
                    />
                    :
                    <ChatFooter
                        checkPermissions={_checkPermissions}
                        permissionsOk={permissionList.every(p => p === 'granted') ? true : false}
                        active={typing.length > 0}
                        msg={typing}
                        send={send}
                        setTyping={(e) => setTyping(e)}
                        placeholder={"Mesajınızı buraya yazın.."} />
            }

            <ActionSheet
                ref={refActionSheet}
                options={[...efectOptions, 'Kapat']}
                cancelButtonIndex={efectOptions.length}
                //  styles={Platform.OS === 'android' ? styles : {}}
                onPress={(index) => {
                    //eğer TAMAM a basmıyorsa
                    if (index != efectOptions.length) {
                        setSelectedEffect(effects[index])
                    }
                }}
            />

        </View>
    );
}

function bindAction(dispatch) {
    return {
        onLogOut: () => dispatch(onLogOut()),
        getMessagesByUserId: ({ userId, limit, offset }) => dispatch(getMessagesByUserId({ userId, limit, offset })),
        sendMessage: (props) => dispatch(sendMessage1(props)),
        resetGetMessagesByUserId: () => dispatch(resetGetMessagesByUserId()),
        addMessageItem: (item) => dispatch(addMessageItem(item)),
        uploadSoundFile: file => dispatch(uploadSoundFile(file)),
        uploadAvatarPhoto: file => dispatch(uploadAvatarPhoto(file)),

    };
}

function mapStateToProps(state) {
    return {
        webSocketUrl: state.settings.webSocketUrl,
        isFetching: state.conversation.isFetching,
        isAllConversationsLoaded: state.conversation.isAllConversationsLoaded,
        conversations: state.conversation.data,
        conversationStatus: state.conversation.conversationStatus,
        inboxSelected: state.inbox.inboxSelected,
        inboxes: state.inbox.data,
        conversationTypingUsers: state.conversation.conversationTypingUsers,
        pushToken: state.notification.pushToken,
        loading: state.conversation.isFetching,
        conversations: state.conversation.conversationList,
        messages: state.conversation.messageList,
        currentUser: state.auth.user,
    };
}


export default connect(mapStateToProps, bindAction)(ChatScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        paddingHorizontal: 17,
    },
    footer: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 10,
        padding: 5,
    },
    btnSend: {
        backgroundColor: "#00BFFF",
        width: 40,
        height: 40,
        borderRadius: 360,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSend: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    inputs: {
        height: 40,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    balloon: {
        maxWidth: 250,
        padding: 10,
        borderRadius: 20,
    },
    itemIn: {
        alignSelf: 'flex-start',
        backgroundColor: colors.primary,
    },
    itemOut: {
        alignSelf: 'flex-end',
        // backgroundColor: colors.secondary
    },
    time: {
        alignSelf: 'flex-end',
        //  margin: 15,
        fontSize: 10,
        color: "#808080",
        margin: 10,
        marginTop: -10,
    },
    item: {
        marginVertical: 14,
        flex: 1,
        //   flexDirection: 'row',
        backgroundColor: "#eeeeee",
        borderRadius: 14,
        padding: 5,
    },
    itemMessage: {
        color: '#fff'
    },
    chatContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: 8,
    },
    loadMoreSpinnerView: {
        alignItems: 'center',
        justifyContent: 'center',
        // paddingBottom: 8,

        padding: 50
    },

    spinnerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});