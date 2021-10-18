import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../constants';

const ScrollToButton = ({ scrollToBottom }) => {
    return (
        <TouchableOpacity onPress={scrollToBottom} style={styles.button} activeOpacity={0.95}>
            <AntDesign name={'arrowdown'} size={36} color={"#FFF"} />
        </TouchableOpacity>
    );
};



export default ScrollToButton;


const styles = StyleSheet.create({
    button: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        position: 'absolute',
        bottom: 70,
        right: 10,
        height: 40,
        backgroundColor: colors.secondary,
        borderRadius: 100,
    },
});