
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//import HomeScreen from "./screens/Home";
import HomeScreen from "./screens/home/index";
import ConversationScreen from "./screens/Conversation";
import ProfileScreen from "./screens/Profile";

import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TouchableOpacity, View } from "react-native"
import { colors } from "./constants";


const Tab = createBottomTabNavigator();

// const renderTabBarOptions=()=>{
//     return{
//         tabBarLabel: 'Anasayfa',
//         tabBarColor: '#009387',
//         tabBarIcon: ({ color }) => (
//           <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//             <AntDesign name="home" color={color} size={26} />
//           </TouchableOpacity>
//         ),
//       }
// }

// '#e91e63'
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
                tabBarLabel: 'Keşfet',
                tabBarIcon: ({ color, focused, size }) => (
                    <AntDesign name="home" color={color} size={size} />),
            }}
        />
        <Tab.Screen
            name="Conversation"
            component={ConversationScreen}
            options={{
                tabBarLabel: 'Chat',
                tabBarIcon: ({ color, focused, size }) => (
                    <Ionicons name="ios-chatbubble-ellipses-outline" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                tabBarLabel: 'Profil',
                tabBarIcon: ({ color, focused, size }) => (
                    <AntDesign name="user" color={color} size={size} />
                ),
            }}
        />

    </Tab.Navigator>
);

export default MainTabScreen;