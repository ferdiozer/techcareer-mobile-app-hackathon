import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height - 120
const SCREEN_WIDTH = Dimensions.get('window').width

//    { id: "1", uri: require('./assets/images/1.jpg') },
// const Users = [
//     { id: "1", uri: "https://images.unsplash.com/photo-1625631979614-7ab4aa53d600?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" },
// ]

export default class App extends React.Component {

    constructor() {
        super()

        this.position = new Animated.ValueXY()
        this.state = {
            currentIndex: 0
        }

        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: ['-30deg', '0deg', '10deg'],
            extrapolate: 'clamp'
        })

        this.rotateAndTranslate = {
            transform: [{
                rotate: this.rotate
            },
            ...this.position.getTranslateTransform()
            ]
        }

        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })
        this.dislikeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        })

        this.nextCardOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp'
        })
        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp'
        })

    }
    UNSAFE_componentWillMount() {
        this.PanResponder = PanResponder.create({

            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {

                this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
            },
            onPanResponderRelease: (evt, gestureState) => {

                if (gestureState.dx > 120) {
                    Animated.spring(this.position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                        useNativeDriver: false
                    }).start(() => {
                        this.props.setCurrentIndex(this.props.currentIndex + 1)
                        this.position.setValue({ x: 0, y: 0 })
                        this.props.handleLikePress(this.props.currentIndex + 1)
                    })
                }
                else if (gestureState.dx < -120) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                        useNativeDriver: false
                    }).start(() => {
                        this.props.setCurrentIndex(this.props.currentIndex + 1)
                        this.position.setValue({ x: 0, y: 0 })
                        this.props.handlePassPress(this.props.currentIndex + 1)
                    })
                }
                else {
                    Animated.spring(this.position, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                        friction: 4
                    }).start()
                }
            }
        })
    }

    renderUsers = () => {

        return this.props.users.map((item, i) => {


            if (i < this.props.currentIndex) {
                return null
            }
            else if (i == this.props.currentIndex) {

                return (
                    <Animated.View
                        {...this.PanResponder.panHandlers}
                        key={item._id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
                        <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>BEĞEN</Text>

                        </Animated.View>

                        <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>BEĞENME</Text>

                        </Animated.View>

                        <Image
                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                            // source={item.uri}
                            source={{ uri: item.avatar }}
                        />
                        <View style={{ position: 'absolute', bottom: 0, paddingBottom: 20, paddingLeft: 20 }}>
                            <Text style={{
                                fontWeight: '700', fontSize: 22, color: '#FFF',
                                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                textShadowOffset: { width: -1, height: 1 },
                                textShadowRadius: 10
                            }}>
                                {item.name}
                            </Text>
                            <Text style={{
                            }}>
                                {item.bio}
                            </Text>
                        </View>
                    </Animated.View>
                )
            }
            else {
                return (
                    <Animated.View

                        key={item._id} style={[{
                            opacity: this.nextCardOpacity,
                            transform: [{ scale: this.nextCardScale }],
                            height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
                        }]}>
                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>BEĞEN</Text>

                        </Animated.View>

                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>BEĞENME</Text>

                        </Animated.View>

                        <Image
                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                            //source={item.uri}
                            source={{ uri: item.avatar }}
                        />

                    </Animated.View>
                )
            }
        }).reverse()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 60 }}>

                </View>
                <View style={{ flex: 1 }}>
                    {this.renderUsers()}
                </View>
                <View style={{ height: 60 }}>

                </View>


            </View>

        );
    }
}