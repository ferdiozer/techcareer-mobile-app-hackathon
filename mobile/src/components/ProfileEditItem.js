import React from 'react';
import styles from '../assets/styles';

import { Text, View } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

const ProfileEditItem = ({
    name,
    bio,
    gender,
    age,
    info1,
    info2,
    info3,
}) => {
    return (
        <View style={styles.containerProfileItem}>

            <View style={styles.matchesProfileItem}>
                <Text style={styles.matchesTextProfileItem}>
                    {age} {gender}
                </Text>
            </View>

            <Text style={styles.name}>{name}</Text>

            {
                bio
                    ?
                    <Text style={styles.descriptionProfileItem}>
                        {bio}
                    </Text>
                    :
                    null
            }
            {
                info1
                &&
                <View style={styles.info}>
                    <Fontisto name="map-marker" style={styles.iconProfile} />
                    <Text style={styles.infoContent}>{info1}</Text>
                </View>
            }
            {
                info2
                &&
                <View style={styles.info}>
                    <Feather name="hash" style={styles.iconProfile} />
                    <Text style={styles.infoContent}>{info2}</Text>
                </View>
            }
            {
                info3
                &&
                <View style={styles.info}>
                    <AntDesign name="clockcircleo" style={styles.iconProfile} />
                    <Text style={styles.infoContent}>{info3}</Text>
                </View>
            }
        </View>
    );
};

export default ProfileEditItem;
