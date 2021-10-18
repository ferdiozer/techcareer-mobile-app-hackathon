
import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { colors } from '../constants';


import RecordLogic from './RecordLogic'


export default function ChatFooter({
    msg,
    placeholder,
    active,
    send,
    permissionsOk,
    checkPermissions,
    setTyping
}) {

    return (
        <View style={styles.footer}>
            <View style={styles.inputContainer}>


                <TextInput style={styles.inputs}
                    value={msg}
                    placeholder={placeholder}
                    underlineColorAndroid='transparent'
                    onSubmitEditing={send}
                    onChangeText={(msg) => setTyping(msg)} />

                <TouchableOpacity onPress={() => send()}
                    //style={[styles.btnSend, active ? styles.bg1 : undefined]}
                    style={[styles.btnSend]}
                >
                    <Ionicons
                        //style={styles.iconSend} 
                        style={active ? styles.colorPrimary : styles.colorWhite}
                        size={22} name="ios-send-sharp" />
                </TouchableOpacity>


            </View>

            <View style={{ flex: 0.2 }}>
                {
                    permissionsOk ?
                        <RecordLogic />
                        :
                        <TouchableOpacity onPress={checkPermissions}>
                            <AntDesignIcon
                                color={colors.primary}
                                size={22} name="setting" />
                        </TouchableOpacity>
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 10,
        padding: 5,
        alignItems: 'center',
    },
    btnSend: {
        width: 40,
        height: 40,
        borderRadius: 360,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bg1: {
        backgroundColor: colors.secondary,
    },
    iconSend: {
        color: '#FFFFFF',
    },
    colorPrimary: {
        color: colors.primary
    },
    colorWhite: {
        color: '#FFF'
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
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
        color: '#000'
    },
});
