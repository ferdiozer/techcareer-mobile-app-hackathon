
import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Text
} from 'react-native';
const { width, height } = Dimensions.get('window');

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { colors } from '../constants';


import RecordLogic from './RecordLogic'


export default function ChatFooter({
    checkPermissions,
    showEfectActionSheet,
    effectName,
    onStopSound
}) {

    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={showEfectActionSheet} style={styles.inputContainer}>
                <Text style={{ maxWidth: '80%' }}>
                    {effectName}
                </Text>
                <AntDesignIcon
                    color={colors.softlight}
                    size={22} name="down" />
            </TouchableOpacity>

            <View style={{ flex: 0.5, }}>
                <RecordLogic
                    type="detail"
                    onStopSound={onStopSound}
                />


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
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    inputs: {
        height: 40,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        color: '#000'
    },
});
