
import React from 'react';
import { View, Image } from 'react-native';

import _ from 'lodash'


import { colors, defaultImages } from '../constants';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



export default ({
    avatar,
    type = "user-astronaut" || "user",
    size = 60
}) => {
    //  size = "large"|| "small"||"medium"
    //let wSize = 60
    let wSize = size

    return (
        <View style={{ marginRight: 10 }}>
            {
                avatar
                    ?
                    <Image
                        source={{ uri: avatar }}

                        style={{
                            width: wSize,
                            height: wSize,
                            borderRadius: wSize / 2
                        }}
                    />
                    :
                    <View style={{
                        width: wSize,
                        height: wSize,
                        borderRadius: wSize / 2,
                        backgroundColor: colors.primary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    >
                        <FontAwesome5 color={colors.WHITE} name="user-astronaut" size={wSize / 2} />
                        {
                            //  type == "astronaut" ?
                            //      <FontAwesome5 color={colors.WHITE} name="user-astronaut" size={wSize / 2} />
                            //      :
                            //      <FontAwesome color={colors.WHITE} name="user" size={wSize / 2} />
                        }

                    </View>

            }
        </View>
    )
}