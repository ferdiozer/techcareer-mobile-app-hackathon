import React, { useState } from 'react';
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
    Dimensions,
    KeyboardAvoidingView,
    StatusBar,
    Modal,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import _ from 'lodash'
const { width, height } = Dimensions.get('window');


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../constants';


export default function ChatHeader(
    {
        avatar,
        name,
        goback,
        online,
        onPressIcon,
        title
    }
) {


    return (
        <View style={styles.container}>


            <View style={styles.innserHeader}>
                {
                    goback
                        ?
                        <TouchableOpacity hitSlop={{ bottom: 50, left: 50, right: 50, top: 50 }} onPress={goback}>
                            <MaterialCommunityIcons name="arrow-left" size={24} />
                        </TouchableOpacity>
                        : <View />
                }

                <Text style={{ fontSize: 20, color: colors.black }}>{title}</Text>

                <View />


            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        paddingTop: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: { height: 10, width: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 2.84,
        elevation: 4,
    },
    innserHeader: {
        paddingHorizontal: 10,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    userPicTop: {
        height: 40,
        width: 40,
        margin: 5,
        borderRadius: 20,

    },
    userPicTopOnline: {
        backgroundColor: '#f8f8f8',
        borderWidth: 2,
        borderColor: '#10ac84'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: width / 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});