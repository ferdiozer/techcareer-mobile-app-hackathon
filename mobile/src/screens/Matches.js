import React, { useEffect } from 'react';
import styles from '../assets/styles';

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  SafeAreaView,
  RefreshControl
} from 'react-native';
import CardItem from '../components/CardItem';
import NotFoundModal from '../components/NotFoundModal';

import VirtualizedView from '../components/VirtualizedView';
import _ from 'lodash'
import { connect } from 'react-redux';
import { setUserStatus, getMatches } from '../actions/home'
import Loading from '../components/Loading';

const Matches = (props) => {

  useEffect(() => {
    props.getMatches()
  }, [])

  // console.log({ token: props.token, matches0: props.matches[0] })

  const bgUrl = `https://images.unsplash.com/photo-1620629228754-6ed8b519bd0f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80`
  const data = _.get(props, "matches", [])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {
        props.loading ? <Loading /> : null
      }
      <ImageBackground
        source={require('../assets/images/bg.png')}
        //  source={{ uri: bgUrl }}
        style={styles.bg}
      >
        <View style={styles.containerMatches}>
          <View style={[styles.top, styles.withBorder]}>
            <Text style={styles.title}>Eşleşmeler</Text>
          </View>
          <VirtualizedView>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              numColumns={2}
              //  data={Demo}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => props.navigation.navigate("UserProfile", { item: item.user })}>
                  <CardItem
                    //  name="dsfsdf"
                    // image={item.image}
                    // image={{ uri: item.photos[0].url }}
                    image={{ uri: _.get(item, "user.avatar") }}
                    name={_.get(item, "user.name", "")}
                    //  status={item.status}
                    variant
                  />
                </TouchableOpacity>
              )}
            />
          </VirtualizedView>
          {(data.length == 0 && !props.loading)
            &&
            <NotFoundModal title="Veri bulunmadı" onPress={() => props.getMatches()} />
          }
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

function bindAction(dispatch) {
  return {
    getMatches: page => dispatch(getMatches(page)),
    setUserStatus: status => dispatch(setUserStatus(status)),
  };
}

function mapStateToProps(state) {
  return {
    webSocketUrl: state.settings.webSocketUrl,
    loading: state.home.loading,
    matches: state.home.matches,
    token: state.auth.token
  };
}

export default connect(mapStateToProps, bindAction)(Matches);