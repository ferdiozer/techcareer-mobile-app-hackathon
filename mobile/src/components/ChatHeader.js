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
import UserAvatar from './UserAvatar';


export default function ChatHeader(
    {
        avatar,
        name,
        loading,
        online,
        onPressIcon,
        left,
        right,
        userAvatar,
        footerType
    }
) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>


            <View style={styles.innserHeader}>
                <TouchableOpacity onPress={(e) => onPressIcon({ action: "back" })}>
                    <MaterialCommunityIcons name="arrow-left" size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onPressIcon({ action: "go-profile" })}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <UserAvatar size={30} avatar={avatar} />
                    <Text style={{ fontSize: 20, color: '#2c3e50' }}>{name}</Text>
                </TouchableOpacity>
                {
                    right
                        ?
                        (<TouchableOpacity onPress={() => { setModalVisible(!modalVisible); }}>
                            <MaterialCommunityIcons name="dots-vertical" size={24} />
                        </TouchableOpacity>)
                        :
                        <View />
                }



            </View>




            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    //  Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Diğer işlemler</Text>

                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: colors.primary, marginBottom: 10 }}
                            onPress={(e) => {
                                setModalVisible(false);
                                onPressIcon({ action: "set-footerType" })
                            }}>
                            <Text style={styles.textStyle}>
                                {footerType == "voice"
                                    ?
                                    "Yazışmalı Sohbet" :
                                    "Sesli Sohbet"}
                            </Text>
                            {loading && <ActivityIndicator color="#FFF" size="small" />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: colors.secondary, marginBottom: 10 }}
                            onPress={(e) => {
                                setModalVisible(false);
                                onPressIcon({ action: "delete-all" })
                            }}>
                            <Text style={styles.textStyle}>Bütün Mesajları Sil</Text>
                            {loading && <ActivityIndicator color="#FFF" size="small" />}
                        </TouchableOpacity>



                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: colors.danger }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Kapat</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>


        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        //   backgroundColor: '#bdc3c7',
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
        borderRadius: 5,
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