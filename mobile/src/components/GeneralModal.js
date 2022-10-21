import React from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Dimensions,
    Platform,
    StyleSheet,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import _ from "lodash";


import { colors } from '../constants';
import i18n from '../i18n';

const color1 = colors.primary;
const color2 = colors.secondary;

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default ({
    buttons = [],
    loading,
    transparent = true,
    title = "",
    onPressButton = () => { },
    modalVisible = false,
    setModalVisible
}) => {
    return (
        <Animatable.View
            animation="fadeInUpBig"
            style={styles.container}
        >
            <Modal
                animationType="fade"
                transparent={transparent}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {
                            title ? <View><Text style={styles.modalText}>{title}</Text></View> : null
                        }
                        {
                            buttons.map((v, i) => {
                                return (
                                    <TouchableOpacity
                                        key={i}
                                        style={styles.openButton}
                                        onPress={() => onPressButton(v)}>
                                        <Text style={styles.textStyle}>{v.title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }


                        <TouchableHighlight
                            style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.textStyle}>
                                {i18n.t('close')}
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </Animatable.View>
    );
};




const styles = StyleSheet.create({
    container: {

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
        backgroundColor: color1,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: WIDTH / 2,
        marginTop: 10
    },
    closeButton: {
        backgroundColor: color2,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: WIDTH / 2,
        marginTop: 10
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});
