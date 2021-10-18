import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { colors } from '../constants';

import Swiper from 'react-native-swiper'

import { doSignIn, onResetPassword } from '../actions/auth';
import { connect } from 'react-redux';
import _, { trim } from "lodash";
import {
    LoginButton,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager
} from 'react-native-fbsdk';


const color1 = colors.primary

const SplashScreen = (props) => {
    const { colors } = useTheme();


    const [data, setData] = React.useState({
        username: '',
        password: '',
        formtype: "login",
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true
    });

    const loginFacebook = async (response) => {
        const postData = {
            name: _.get(response, "name"),
            email: _.get(response, "email"),
            avatar: _.get(response, "picture.data.url"),
            FBid: _.get(response, "id", ""),
            FBaccessToken: _.get(data, "facebookData.accessToken"),
            FBuserID: _.get(response, "id"),
            fbData: _.get(data, "facebookData")
        }
        props.doSignIn(postData)
    }
    //Create response callback.
    const _responseInfoCallback = (error, result) => {
        console.log("_responseInfoCallback", result)
        if (error) {
            console.log('Error fetching data: ', error);
        } else {
            loginFacebook(result)
        }
    }





    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.View animation="bounce">
                    <Swiper showsButtons={false} autoplay={true} showsPagination={false} style={styles.wrapper}>
                        <View style={styles.slide1}>
                            <Animatable.Image
                                animation="bounceIn"
                                duraton="1500"
                                source={require('../assets/images/logo.png')}
                                style={styles.logo}
                                resizeMode="stretch"
                            />
                        </View>

                        <View style={styles.slide3}>
                            <Text style={styles.textSlide}>Tanışmak istediklerini sağa kaydır</Text>
                        </View>
                        <View style={styles.slide4}>
                            <Text style={styles.textSlide}>Tanışmak istemediklerini sola kaydır</Text>
                        </View>
                        <View style={styles.slide2}>
                            <Text style={styles.textSlide}>Kullanımı çok kolay sosyal uygulama</Text>
                            <Text style={styles.text}>Sadece sağa sola kaydırarak gönlündekiyle eşleşebilirsin</Text>
                        </View>
                        <View style={styles.slide5}>
                            <Animatable.Image
                                animation="bounceIn"
                                duraton="1500"
                                source={require('../assets/images/logo.png')}
                                style={{ height: 100, width: 100 }}

                            />
                            <Text style={styles.text}>Her ikinizde sağa kaydırdıysanız eşleşmiş oluyorsun</Text>
                            <Text style={styles.text}>Artık yeni arkadaşının profiline bakabilir ve sohbet edebilirsin!</Text>
                            <Text style={styles.text}>iyi eğlenceler</Text>
                        </View>
                    </Swiper>
                </Animatable.View>
            </View>
            <Animatable.View
                style={[styles.footer, {
                    backgroundColor: colors.background,
                    marginTop: -50
                }]}
                animation="fadeInUpBig"
            >
                <Text style={[styles.title, {
                    color: colors.text
                }]}>
                    Tandır
                </Text>

                <Text style={styles.text}>Tandır ile yeni arkadaş edinmek çok kolay!</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('SignInScreen')}>
                        <LinearGradient
                            colors={[color1, color1]}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>DEVAM</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color="#fff"
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 20
                }}>
                    <LoginButton
                        publishPermissions={["publish_actions"]}
                        onLoginFinished={
                            (error, result) => {
                                if (error) {
                                    console.log("login has error: " + result.error);
                                } else if (result.isCancelled) {
                                    console.log("login is cancelled.");
                                } else {
                                    AccessToken.getCurrentAccessToken().then(
                                        (data) => {
                                            setData({
                                                ...data,
                                                facebookData: data
                                            })
                                            const infoRequest = new GraphRequest(
                                                '/me?fields=id,name,first_name,last_name,email,picture.type(large)',
                                                null,
                                                _responseInfoCallback
                                            );
                                            new GraphRequestManager().addRequest(infoRequest).start();
                                        }
                                    )
                                }
                            }
                        }
                        onLogoutFinished={() => console.log("logout.")} />
                </View>

            </Animatable.View>
        </View>
    );
};


function bindAction(dispatch) {
    return {
        doSignIn: user => dispatch(doSignIn(user)),
        onResetPassword: email => dispatch(onResetPassword(email))
    };
}

function mapStateToProps(state) {
    return {
        loading: state.auth.loading,
        user: state.auth.user,
        success: state.auth.success,
        error: state.auth.error

    };
}

export default connect(mapStateToProps, bindAction)(SplashScreen);

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    },
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 20
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        padding: 20
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#27ae60',
        padding: 20
    },
    slide4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e74c3c',
        padding: 20
    },
    slide5: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.softlight,
        padding: 20
    },
    textSlide: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20
    }
});

