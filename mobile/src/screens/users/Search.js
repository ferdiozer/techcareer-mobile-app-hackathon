import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import CardItem from '../../components/CardItem';
import styles from '../../assets/styles';
import { NotifierRoot, Notifier, NotifierComponents } from 'react-native-notifier';
import MyAnalytic from '../../MyAnalytic';
import Loading from '../../components/Loading';

import CardSwipe from '../../components/cards/CardSwipe'


import { connect } from 'react-redux';

import { searchUser, testHomeChange1, getHomeRecs, swipedRight, swipedLeft } from '../../actions/home'
import { saveDeviceDetails } from '../../actions/notification';

import NotFoundModal from '../../components/NotFoundModal';

import _ from 'lodash'
import ChatHeader from '../../components/ChatHeader';
import Header from '../../components/Header';
import TopBar from '../../components/TopBar';
import BottomBar from '../../components/BottomBar';
import i18n from '../../i18n';
import EmptyInbox from '../../components/EmptyInbox';
import { colors, defaultImages } from '../../constants';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserAvatar from '../../components/UserAvatar';






const analytics = new MyAnalytic()

const Search = (props) => {

    const [typing, setTyping] = useState('')
    const [pageLoading, setPageLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])

    const loading = props.loading;

    const { currentUser } = props


    const servicesOp = async (text) => {
        setPageLoading(true)
        try {
            //  const result = await props.searchUser(typeof text == 'string' ? text : typing)
            let result = await props.searchUser(text ? text : typing)
            //kendisi de listede çıkarsa kaldırdık
            result = result.filter(v => v._id != currentUser._id)

            setDataSource(result)
        } catch (error) {
            console.log("HATA:", error)
        } finally {
            setPageLoading(false)
        }

    }





    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };


    return (
        <View style={styles.bg}>
            <Header goback={() => props.navigation.goBack()} title="Ara" />
            {pageLoading && <Loading />}



            <View
                style={{
                    backgroundColor: '#fff',
                    padding: 5,
                    marginTop: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    marginHorizontal: 20,
                    // borderWidth: 0.1,
                }}
            >
                <TextInput
                    autoFocus={true}
                    onEndEditing={servicesOp}
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="always"
                    value={typing}
                    onChangeText={text => {
                        setTyping(text)
                        if (text) servicesOp(text)

                    }}
                    placeholder="Anahtar kelimeyi buraya girin.."
                    style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
                />
            </View>

            <FlatList
                // data={searchList}
                data={dataSource}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("ChatScreen", { item: { user: item } })}
                        //  onPress={() => {
                        //      // navigation.navigate('PublicProfile', { item })
                        //      console.log(item)
                        //  }}
                        key={index}
                        //style={styles.listItem}
                        style={{
                            backgroundColor: '#fff',
                            padding: 5,
                            marginVertical: 10,
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            marginHorizontal: 20,
                            flexDirection: 'row',
                            alignItems: 'center',

                            shadowColor: colors.DARK_GRAY,
                            shadowOffset: { height: 50, width: 50 },
                            shadowOpacity: 0.15,
                            shadowRadius: 2.84,
                            elevation: 1,

                        }}
                    >

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("UserProfile", { item })}>
                            <UserAvatar avatar={item.avatar} />
                        </TouchableOpacity>




                        <View style={styles.metaInfo}>
                            <Text numberOfLines={1} style={styles.title}>{`${item.name}`}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            //  ItemSeparatorComponent={ItemSeparatorView}
            />

        </View >
    );
};


function bindAction(dispatch) {
    return {
        searchUser: props => dispatch(searchUser(props)),
    };
}

function mapStateToProps(state) {
    return {
        loading: state.home.loading,
        searchusers: state.home.searchusers,
        currentUser: state.auth.user,
    };
}

export default connect(mapStateToProps, bindAction)(Search);
