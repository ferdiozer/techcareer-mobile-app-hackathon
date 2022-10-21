import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, Dimensions, TouchableOpacity, FlatList, RefreshControl } from 'react-native';

import styles from '../assets/styles';

import Loading from '../components/Loading';


import AntDesignIcon from 'react-native-vector-icons/AntDesign';


import { connect } from 'react-redux';

import { getMe, testHomeChange, testHomeChange1, } from '../actions/home'
import { saveDeviceDetails } from '../actions/notification';
import { getConversations } from '../actions/conversation';


import _ from 'lodash'
import moment from 'moment'
import i18n from '../i18n';
import EmptyInbox from '../components/EmptyInbox';
import UserAvatar from '../components/UserAvatar';
import { colors } from '../constants';
import Message from '../components/Message';



const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

const Home = (props) => {

    
    const [pageLoading, setPageLoading] = useState(false)
    const [conversations, setConversations] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    const loading = props.loading;

    const meFromServer = async () => {
        try {
            setPageLoading(true)
            const meData = await props.getMe();
            setCurrentUser(meData.user)
            console.log("meData", meData)

        } catch (error) {

        }
        finally {
            setPageLoading(false)
        }

    }

    useEffect(() => {
        initNotification()

        console.log("currentUser::", props.currentUser)
        meFromServer()
        getConversationsFromServer()
    }, [])


    const getConversationsFromServer = async () => {
        try {
            setPageLoading(true)
            const serverData = await props.getConversations({ pageNumber: 1 });
            console.log("meDaconversations:::", conversations)
            setConversations(serverData)

        } catch (error) {
            console.log(error)
        }
        finally {
            setPageLoading(false)
        }

    }


    const initNotification = () => {
        const { pushToken } = props;

        props.saveDeviceDetails({ token: null });
        if (pushToken) {
            props.saveDeviceDetails({ token: pushToken });
        }
    }

    return (
        <ImageBackground
            source={require('../assets/images/bg.png')}
            style={styles.bg}
        >

            <View style={{ flex: 1 }}>
                <View style={{

                    //  alignItems: 'center',
                    flex: 1,
                    //width: fullWidth,
                    backgroundColor: colors.primary,
                    paddingHorizontal: 20
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#FFF',
                        height: fullHeight / 5,//150
                        marginTop: fullHeight / 10,
                        borderRadius: 10,
                        paddingHorizontal: 20,

                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.18,
                        shadowRadius: 1.65,

                        elevation: 2,
                    }}>

                        {
                            pageLoading || loading
                                ?
                                <Loading color={colors.primary} />
                                :
                                <>
                                    <UserAvatar avatar={currentUser?.user?.avatar} />
                                    <View>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                            {_.get(currentUser, "name")}
                                        </Text>
                                        <Text>
                                          {i18n.t('lastLogin')} : {moment(_.get(currentUser, "lastOnline", new Date())).format("DD.MM.YYYY HH.mm dddd")}
                                        </Text>
                                        <Text style={{
                                            color:'#3e3e3e'
                                        }}>
                                            {moment(_.get(currentUser, "lastOnline", new Date())).fromNow()}
                                        </Text>
                                    </View>
                                </>
                        }



                    </View>
                </View>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 3 }}>
                {
                    (pageLoading || loading)
                        ?
                        <Loading color={colors.primary} />
                        :
                        conversations.length > 0
                            ?
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1 }}>

                                </View>
                                <View style={{ flex: 1, position: 'absolute', top: 20, right: 20 }}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate("SearchUserScreen")}
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: fullHeight / 20,
                                            width: fullHeight / 20,
                                            backgroundColor: colors.primary,
                                            borderRadius: (fullHeight / 20) / 10
                                        }}
                                    >
                                        <AntDesignIcon name={"search1"} color={'#FFF'} size={(fullHeight / 30)} />
                                    </TouchableOpacity>

                                </View>
                                <View style={{ flex: 2 }}>
                                    <View
                                        style={{
                                            width: 231,
                                            marginTop: 20,
                                            marginBottom: 10,
                                            //  marginBottom: -15,
                                            backgroundColor: colors.primary,
                                            paddingVertical: 5,
                                            paddingHorizontal: 20,
                                            borderRadius: 10,
                                            textAlign: "center",
                                            alignSelf: "center",
                                            alignItems: 'center',
                                            shadowColor: '#000',
                                            shadowOffset: { height: 10, width: 0 },
                                            shadowOpacity: 0.15,
                                            shadowRadius: 2.84,
                                            elevation: 2,
                                        }}>
                                        <Text style={{ color: '#FFF' }}>
                                            {i18n.t('lastConversations')}
                                        </Text>
                                    </View>
                                    <FlatList
                                        // style={{ backgroundColor: 'red', height: 100 }}
                                        data={conversations.slice(0, 5)}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <View>
                                                <TouchableOpacity
                                                    style={{
                                                        backgroundColor: '#FFF',
                                                        paddingHorizontal: 20,
                                                        paddingVertical: 10,
                                                        borderRadius: 10,
                                                        flex: 1,
                                                        marginBottom: 10
                                                    }}
                                                    onPress={() => props.navigation.navigate("ChatScreen", { item })}>
                                                    <Message
                                                        // {...item}
                                                        lastMessage={item.message}
                                                        avatar={item?.user?.avatar}
                                                        //   image={{ uri: _.get(item, "user.avatar", defaultImages.userAvatar) }}
                                                        name={_.get(item, "user.name", "")}
                                                        time={moment(item.created).fromNow()}
                                                    // lastMessage={item.message}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={pageLoading}
                                                onRefresh={getConversationsFromServer}
                                            />
                                        }

                                    />
                                </View>
                            </View>

                            :
                            <EmptyInbox 
                            onPress={() => props.navigation.navigate("SearchUserScreen")} 
                            />
                }

            </View>
        </ImageBackground >
    );
};


function bindAction(dispatch) {
    return {
        testChanged: article => dispatch(testHomeChange(article)),
        testChanged1: article => dispatch(testHomeChange1(article)),
        saveDeviceDetails: ({ token }) => dispatch(saveDeviceDetails({ token })),
        getMe: () => dispatch(getMe()),
        getConversations: ({ pageNumber }) =>
            dispatch(
                getConversations({
                    pageNumber,
                }),
            ),
    };
}

function mapStateToProps(state) {
    return {
        webSocketUrl: state.settings.webSocketUrl,
        loading: state.home.loading,
        recs: state.home.recs,
        conversations: state.conversation.data,
        testkey: state.home,
        pushToken: state.notification.pushToken,
        currentUser: state.auth.user,
    };
}

export default connect(mapStateToProps, bindAction)(Home);
