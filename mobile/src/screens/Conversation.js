import React, { useEffect } from 'react';
import styles from '../assets/styles';

import {
    ScrollView,
    Text,
    TouchableOpacity,
    ImageBackground,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import Message from '../components/Message';
import Demo from '../assets/data/demo.js';

import { connect } from 'react-redux';
import { getConversations } from '../actions/conversation';


import _ from "lodash"
import NotFoundModal from '../components/NotFoundModal';
import { defaultImages } from '../constants';
import moment from 'moment';
import EmptyInbox from '../components/EmptyInbox';
import Loading from '../components/Loading';


const Messages = (props) => {


    useEffect(() => {
        props.getConversations({ pageNumber: 1 })
    }, [])

    const getItems = async () => {
        console.log("!!getItems")
        props.getConversations({ pageNumber: 1 })

    }
    const refreshing = props.loading;
    const data = _.get(props, "conversations", [])

    return (
        <ImageBackground
            source={require('../assets/images/bg.png')}
            style={styles.bg}
        >
            <View style={styles.containerMessages}>
                <View style={styles.top}>
                    <Text style={styles.title}>Mesajlar</Text>
                </View>

                {
                    refreshing && <Loading />
                }



                {
                    (data.length == 0 && !refreshing)
                        ?
                        <View style={{ alignItems: "center", flex: 1, justifyContent: "center", }}>

                            <EmptyInbox
                                onPress={() => props.navigation.navigate("SearchUserScreen")}
                                bottom={<NotFoundModal subTitle="Yenile" onPress={() => getItems()} />} />
                        </View>
                        :
                        <FlatList
                            //data={Demo}
                            data={data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{
                                        marginBottom: 10
                                    }}
                                    onPress={() => props.navigation.navigate("ChatScreen", { item })}>
                                    <Message
                                        image={{ uri: _.get(item, "user.avatar", defaultImages.userAvatar) }}
                                        avatar={item?.user?.avatar}
                                        name={_.get(item, "user.name", "")}
                                        time={moment(item.created).fromNow()}
                                        lastMessage={item.message}
                                    />
                                </TouchableOpacity>
                            )}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={getItems}
                                />
                            }
                        />
                }

            </View>
        </ImageBackground>
    );
};

function bindAction(dispatch) {
    return {
        getInboxes: () => dispatch(getInboxes()),
        getAgents: () => dispatch(getAgents()),
        getConversations: ({ pageNumber }) =>
            dispatch(
                getConversations({
                    pageNumber,
                }),
            ),
        selectConversation: ({ conversationId }) => dispatch(setConversation({ conversationId })),
        loadInitialMessages: ({ messages }) => dispatch(loadInitialMessage({ messages })),
        getAllNotifications: ({ pageNo }) => dispatch(getAllNotifications({ pageNo })),
        setAssigneeType: ({ assigneeType }) => dispatch(setAssigneeType({ assigneeType })),
        onLogOut: () => dispatch(onLogOut()),
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
        loading: state.conversation.isFetching,
        conversations: state.conversation.conversationList
    };
}


export default connect(mapStateToProps, bindAction)(Messages);

