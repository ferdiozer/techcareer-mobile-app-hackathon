
import React, { useState, useEffect } from "react";

import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar, View } from 'react-native';
import MainTabScreen from "./MainTabScreen";
import ChatScreen from "./screens/Chat";
import SearchUserScreen from "./screens/Search";

import { AuthContext } from './context/AuthContext';

import io from 'socket.io-client';
//import io from 'socket.io-client/dist/socket.io';
import _ from "lodash";
import { SOCKET_URL } from "./constants/url";
import UserProfile from "./screens/UserProfile";
import RootStackScreen from "./screens/RootStackScreen";

import { connect } from 'react-redux';

import "moment/locale/tr";

const connectionConfig = {
    jsonp: false,
    reconnection: true,
    reconnectionDelay: 100,
    secure: true,
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
    autoConnect: true,
    forceNew: true,
    //   transports: ['websocket'],
};
const socket = io.connect(SOCKET_URL, connectionConfig);


const Stack = createStackNavigator();

const MainApp = (props) => {




    const authContext = React.useMemo(() => ({
        socket: socket
    }), [])


    const userId = _.get(props, "user._id")

    useEffect(() => {
        // alert("aömlhjk")
        socketOp()
        //user id ye bağlı ne olabilir ?
    }, [userId])  //    }, [userId])

    const socketOp = () => {
        console.log({ socket })
        /////////   -- SOCKET -- ////////////

        socket.on('connect', () => {
            console.log("!!socket connected", socket.connected); // true
            if (userId) {
                socket.emit('setUserId', userId)
            }
            socket.emit("ready");
            socket.on("get client id", (arg) => {
                console.log("!!!!!!socket:on:get client id:", { arg, userId })

            })
            /////////   -- SOCKET --end ////////////
        });
        socket.on('disconnect', () => {
            console.log("!!socket.disconnected", socket.disconnected); // true
        });

    }


    const { isLoggedIn } = props
    //   const { user } = props
    //  console.log("MainApp", { user })
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
                {
                    isLoggedIn
                        ?
                        <Stack.Navigator initialRouteName="HomeDrawer">
                            <Stack.Screen options={{ headerShown: false }} name="HomeDrawer" component={MainTabScreen} />
                            <Stack.Screen options={{ headerShown: false }} name="ChatScreen" component={ChatScreen} />
                            <Stack.Screen options={{ headerShown: false }} name="SearchUserScreen" component={SearchUserScreen} />
                            <Stack.Screen name="RoomScreen" component={MainTabScreen} />
                            <Stack.Screen name="SupportScreen" component={MainTabScreen} />
                            <Stack.Screen options={{ headerShown: false }} name="UserProfile" component={UserProfile} />
                            <Stack.Screen options={{ title: 'Şikayet' }} name="Report" component={MainTabScreen} />
                        </Stack.Navigator>
                        :
                        <RootStackScreen />
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

function bindAction(dispatch) {
    return {
        testChanged: article => dispatch(testHomeChange(article))
    };
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn
    };
}

export default connect(mapStateToProps, bindAction)(MainApp);

