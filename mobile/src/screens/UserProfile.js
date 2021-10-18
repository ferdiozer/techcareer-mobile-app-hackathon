import React from 'react';
import styles from '../assets/styles';

import {
    ScrollView,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import ProfileItem from '../components/ProfileItem';

import Fontisto from 'react-native-vector-icons/Fontisto';

import _ from 'lodash'
import moment from "moment"
import { connect } from 'react-redux';

import { colors } from '../constants';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAge, renderGender } from '../helpers';
import UserAvatar from '../components/UserAvatar';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const fullWidth = Dimensions.get('window').width;

const UserProfile = (props) => {


    const iconViewSize = WIDTH / 10

    const user = _.get(props, "route.params.item")
    //    source={require('../assets/images/bg.png')}
    //   image={{ uri: item.photos[0].url }}
    return (
        <ImageBackground
            source={require('../assets/images/bg.png')}
            style={styles.bg}
        >
            <ScrollView style={styles.containerProfile}>
                <ImageBackground
                    // source={{ uri: item.photos[0].url }}
                    // source={{ uri: item.photos[0].url }}
                    source={{ uri: user.avatar }}
                    style={styles.photo}>
                    <View style={styles.top}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.topIconLeft}>
                            <Fontisto name="angle-left" color={colors.white} size={30} />
                        </TouchableOpacity>
                        {
                            // <TouchableOpacity style={styles.topIconRight}>
                            //     <Fontisto name="more-v-a" color={colors.white} size={30} />
                            // </TouchableOpacity>
                        }

                    </View>
                </ImageBackground>
                {
                    !user.avatar
                    &&
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        position: 'absolute',
                        bottom: HEIGHT / 3,
                        right: 0,
                        left: 0
                    }}>
                        <UserAvatar size={iconViewSize * 5} type={"user-astronaut"} />
                    </View>
                }


                <ProfileItem
                    name={_.get(user, "name")}
                    bio={_.get(user, "bio")}
                    age={moment(user.created).fromNow()}
                    // age={moment(user.created).fromNow()}
                    //age={user.birth_date ? getAge(user.birth_date) : undefined}
                    //gender={renderGender(user.gender)}
                    //gender={moment(user.created).fromNow()}
                    // gender={"Test"}
                    info1={"Türkiye"}
                    info3={user.lastOnline ? moment(user.lastOnline).fromNow() : undefined}
                />

                <View style={styles.actionsProfile}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("ChatScreen", { item: { user } })}
                        style={styles.roundedButton}>
                        <Ionicons style={styles.iconButton} name="ios-chatbubble-ellipses-outline" color={colors.white} />
                        <Text style={styles.textButton}>Mesaj yolla</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default UserProfile;
