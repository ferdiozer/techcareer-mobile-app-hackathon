import React, { useEffect, useState } from 'react';
import { View,Text, TextInput, FlatList, TouchableOpacity } from 'react-native';

import styles from '../assets/styles';

import Loading from '../components/Loading';


import { connect } from 'react-redux';

import { searchUser } from '../actions/home'

import _ from 'lodash'

import Header from '../components/Header';

import { colors } from '../constants';

import UserAvatar from '../components/UserAvatar';
import i18n from '../i18n';






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




    return (
        <View style={styles.bg}>
            <Header goback={() => props.navigation.goBack()}
             title={i18n.t('search')}
             />
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
                    placeholder={i18n.t('searchPlaceholder')}
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
