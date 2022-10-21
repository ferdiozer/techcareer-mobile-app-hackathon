
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "./screens/Home";
import ConversationScreen from "./screens/Conversation";
import ProfileScreen from "./screens/Profile";

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import i18n from './i18n';
import { colors } from "./constants";


const Tab = createBottomTabNavigator();

const MainTabScreen = ({ navigation }) => (
    <Tab.Navigator
        initialRouteName="Home"
        lazy={true}
        tabBarOptions={{
            activeTintColor: colors.primary,
        }}
    >
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                tabBarLabel: i18n.t('tab.discover'),
                tabBarIcon: ({ color, focused, size }) => (
                    <AntDesign name="home" color={color} size={size} />),
            }}
        />
        <Tab.Screen
            name="Conversation"
            component={ConversationScreen}
            options={{
                tabBarLabel: i18n.t('tab.chat'),
                tabBarIcon: ({ color, focused, size }) => (
                    <Ionicons name="ios-chatbubble-ellipses-outline" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                tabBarLabel: i18n.t('tab.profile'),
                tabBarIcon: ({ color, focused, size }) => (
                    <AntDesign name="user" color={color} size={size} />
                ),
            }}
        />

    </Tab.Navigator>
);

export default MainTabScreen;