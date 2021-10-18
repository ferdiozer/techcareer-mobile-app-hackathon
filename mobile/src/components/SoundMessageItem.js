

import React, { useEffect, useState, useRef, useContext } from 'react';
import { View } from 'react-native';


import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../constants';


export default ({
    playing,
    iconSize = 20,
    iconColor = colors.white
}) => {
    return (
        <View style={{ flex: 1 }}>
            {!playing && <FeatherIcon name="play" color={iconColor} size={iconSize} />}
            {playing && <EntypoIcon name="controller-stop" color={iconColor} size={iconSize} />}
        </View>
    )


}

//   {playing && <AntDesignIcon name="pause" color={iconColor} size={iconSize} />}