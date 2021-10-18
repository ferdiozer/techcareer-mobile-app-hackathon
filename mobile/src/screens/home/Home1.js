import React, { useEffect } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import CardItem from '../../components/CardItem';
import styles from '../../assets/styles';

import { NotifierRoot, Notifier, NotifierComponents } from 'react-native-notifier';
import MyAnalytic from '../../MyAnalytic';
import Loading from '../../components/Loading';

import { connect } from 'react-redux';

import { testHomeChange, testHomeChange1, getHomeRecs, swipedRight, swipedLeft } from '../../actions/home'
import { saveDeviceDetails } from '../../actions/notification';

import NotFoundModal from '../../components/NotFoundModal';

import _ from 'lodash'

const analytics = new MyAnalytic()

const Home = (props) => {

  const loading = props.loading;

  const recs = _.get(props, "recs", [])

  // const swiper = React.useRef(null)
  const notifierRef = React.useRef();

  useEffect(() => {
    if (_.get(props, "recs", []).length == 0) {
      props.getRecs()
    }
  }, [recs])


  useEffect(() => {
    initNotification()
  }, [])



  const initNotification = () => {
    const { pushToken } = props;
    props.saveDeviceDetails({ token: null });
    if (!pushToken) {
      props.saveDeviceDetails({ token: pushToken });
    }
  }

  const showNotification = async (title, description, alertType) => {
    Notifier.showNotification({
      title,
      description,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType,
      },
    });
  }

  const onSwipedRight = (index) => {
    try {
      const item = getItemByIndex(index)
      showNotification(_.get(item, "name", ""), 'Beğendin', "success")
      analytics.logEvent("onSwipedRight", { id: _.get(item, "_id") })
      //props.swipedRight({ item, recs: props.recs })
      props.swipedRight(item._id)
    } catch (error) {
      console.log(error)
    }

  }
  const onSwipedLeft = (index) => {
    try {
      const item = getItemByIndex(index)
      showNotification(_.get(item, "name", ""), 'Beğenmedin', "error")
      analytics.logEvent("onSwipedLeft", { id: _.get(item, "_id") })
      props.swipedLeft(item._id)
    } catch (error) {
      console.log(error)
    }

  }

  const getItemByIndex = (index) => {
    return props.recs[index]
  }

  //const recs = []
  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={styles.bg}
    >

      <View style={{ marginTop: 30 }}>
        <NotifierRoot ref={notifierRef} />
      </View>

      {loading && <Loading />}
      <View style={styles.containerHome}>

        <View style={styles.top} />
        {
          recs.length > 0
            ?
            < CardStack
              ref={swiper => {
                this.swiper = swiper
              }}
              onSwipedRight={onSwipedRight}
              onSwipedLeft={onSwipedLeft}
              loop={true}
              verticalSwipe={true}
              showSecondCard={false}
              renderNoMoreCards={() => null}
            // ref={swiper}
            >
              {recs.map((item, index) => (
                <Card key={index}>
                  <CardItem
                    home
                    // image={item.image}
                    //  image={{ uri: item.photos[0].url }}
                    image={{ uri: item.avatar }}
                    name={item.name}
                    description={item.bio}
                    actions
                    // onPressLeft={() => swiper.swipeLeft()}
                    onPressLeft={() => this.swiper.swipeLeft()}
                    onPressRight={() => this.swiper.swipeRight()}
                  />
                </Card>
              ))}
            </CardStack>
            :
            null
        }
        {
          (!loading && recs.length == 0) && <NotFoundModal subTitle="Başka Kimse kalmadı" title="Yenile" onPress={() => props.getRecs(2)} />
        }
      </View>
    </ImageBackground >
  );
};


function bindAction(dispatch) {
  return {
    testChanged: article => dispatch(testHomeChange(article)),
    testChanged1: article => dispatch(testHomeChange1(article)),
    getRecs: page => dispatch(getHomeRecs(page)),
    swipedRight: itemId => dispatch(swipedRight(itemId)),
    swipedLeft: itemId => dispatch(swipedLeft(itemId)),
    saveDeviceDetails: ({ token }) => dispatch(saveDeviceDetails({ token })),
  };
}

function mapStateToProps(state) {
  return {
    webSocketUrl: state.settings.webSocketUrl,
    loading: state.home.loading,
    recs: state.home.recs,
    isAllConversationsLoaded: state.conversation.isAllConversationsLoaded,
    conversations: state.conversation.data,
    testkey: state.home,
    pushToken: state.notification.pushToken,
  };
}

export default connect(mapStateToProps, bindAction)(Home);
