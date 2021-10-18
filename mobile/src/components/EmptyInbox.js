import React from 'react';
import styles from '../assets/styles';

import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
//import AntDesign from '../../node_modules/react-native-vector-icons/AntDesign';

import { colors } from '../constants'
import i18n from '../i18n';
import { color } from 'react-native-reanimated';

const EmptyInbox = ({
    onPress,
    variant,
    bottom,
    width
}) => {
    // Custom styling
    const fullWidth = Dimensions.get('window').width;
    const fullHeight = Dimensions.get('window').height;

    const iconSize = 30

    //  <Text style={styles.descriptionCardItem}>{description.replace(/^\s+|\s+$/g, "")}</Text>

    return (
        <View style={{
            backgroundColor: '#FFF',
            borderRadius: 8,
            alignItems: "center",
            margin: 10,
            shadowOpacity: 0.05,
            shadowRadius: 10,
            shadowColor: "#000",
            shadowOffset: { height: 10, width: 50 },
            paddingHorizontal: 80,
            paddingVertical: 20,
            alignContent: 'center',
            alignSelf: 'center',
            maxHeight: fullHeight / 2,
            width: width ? width : undefined
        }}>

            <Text style={{ color: colors.danger, fontSize: 18 }}>
                {i18n.t("message.not_found")}
            </Text>

            <View style={{
                //	flexDirection: "row",
                alignItems: "center",
                paddingVertical: 30
            }}>
                <TouchableOpacity
                    style={{
                        borderRadius: 5,
                        borderWidth: .4,
                        borderColor: colors.GRAY,
                        padding: 10,
                        width: fullWidth / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={onPress}
                >
                    <Text style={styles.dislike}>
                        <Entypo name="new-message" size={iconSize} />
                        {i18n.t("message.new_message")}

                    </Text>
                </TouchableOpacity>
                {bottom}
            </View>

        </View>
    );
};

export default EmptyInbox;
