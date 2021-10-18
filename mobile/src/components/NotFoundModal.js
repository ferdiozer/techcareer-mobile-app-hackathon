import React from 'react';
import styles from '../assets/styles';

import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import AntDesign from '../../node_modules/react-native-vector-icons/AntDesign';

import { colors } from '../constants'

const NotFoundModal = ({
    onPress,
    title,
    subTitle,
    variant
}) => {
    // Custom styling
    const fullWidth = Dimensions.get('window').width;
    const imageStyle = [
        {
            borderRadius: 8,
            width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
            height: variant ? 170 : 350,
            margin: variant ? 0 : 20
        }
    ];

    const nameStyle = [
        {
            paddingTop: variant ? 10 : 15,
            paddingBottom: variant ? 5 : 7,
            color: '#363636',
            fontSize: variant ? 15 : 30
        }
    ];

    const iconSize = 30


    return (
        <TouchableOpacity
            style={[styles.noFoundModalContainer, { width: fullWidth / 2 }]}
            onPress={() => onPress()}>
            <View style={styles.button}  >
                <MaterialIcons name="refresh" size={iconSize} />
            </View>
            {
                title
                &&
                <Text style={styles.noFoundModalTitle}>
                    {title}
                </Text>
            }

            {
                subTitle
                &&
                <Text style={styles.noFoundModalSubTitle}>
                    {subTitle}
                </Text>
            }

        </TouchableOpacity>
    );
};

export default NotFoundModal;
